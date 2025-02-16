import React from "react";

import { getWalletClient, waitForTransactionReceipt } from "@wagmi/core";
import { parseUnits } from "viem";
import { arbitrumSepolia, base } from "viem/chains";
import {
  useAccount,
  useClient,
  useConfig,
  usePublicClient,
  useReadContract,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import useEventContract from "@/contracts/Event";
import useMarketplaceContract from "@/contracts/Marketplace";
import useUSDCContract from "@/contracts/USDC";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import api from "@/utils/axios";
import { envVars } from "@/utils/envVars";

const useListTicket = () => {
  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const PaymentContract = useUSDCContract();

  const config = useConfig();
  const account = useAccount();
  const { writeContractAsync: writeContract } = useWriteContract();
  const client = usePublicClient();

  const approveTransfer = async (eventContract: `0x${string}`) => {
    const approval = await client?.readContract({
      abi: EventContract.abi,
      address: eventContract as `0x${string}`,
      functionName: "isApprovedForAll",
      args: [account.address, MarketplaceContract.address],
    });

    console.log({ approval });

    if (!approval) {
      const options = {
        address: eventContract,
        abi: EventContract.abi,
        functionName: "setApprovalForAll",
        args: [MarketplaceContract.address, true],
      };

      const hash = await writeContract(options);

      const receipt = await waitForTransactionReceipt(config, { hash });
    }

    return true;
  };

  const signTypedData = async ({
    tokenId,
    price,
    event,
  }: {
    tokenId: string;
    price: string;
    event: Event;
  }) => {
    const client = await getWalletClient(config);
    console.log({ price, tokenId });

    const domain = {
      // sampled from Marketplace.sol:~line 60
      name: "SimplrMarketplace",
      version: "1.0.0",
      chainId: envVars.isTestNetwork ? arbitrumSepolia.id : base.id,
      verifyingContract: MarketplaceContract.address,
    } as const;

    const types = {
      // sampled from Marketplace.sol:~line 16 :-
      //    Listing(address eventContract,uint256 tokenId,uint256 price,address seller,uint256 deadline)
      Listing: [
        { name: "eventContract", type: "address" },
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "seller", type: "address" },
        { name: "deadline", type: "uint256" },
      ],
    } as const;

    const signature = await client?.signTypedData({
      account: account.address ?? "0x",
      domain,
      types,
      primaryType: "Listing",
      message: {
        eventContract: event.contractAddress as `0x${string}`,
        tokenId: BigInt(tokenId),
        price: parseUnits(price, PaymentContract.decimals),
        seller: account.address ?? "0x",
        deadline: BigInt(event.deadline),
      },
    });

    console.log({ signature });

    return signature;
  };

  const listTicket = async ({
    price,
    signature,
    ticket,
  }: {
    price: string;
    signature: string;
    ticket: Ticket;
  }) => {
    try {
      if (price && signature) {
        const options = {
          address: MarketplaceContract.address as `0x${string}`,
          abi: MarketplaceContract.abi,
          functionName: "listTicket",
          args: [
            {
              eventContract: EventContract.address,
              tokenId: ticket.tokenId,
              price: parseUnits(price, PaymentContract.decimals),
              seller: account.address as `0x${string}`,
              deadline: BigInt(ticket.event.deadline),
            },
          ],
        };

        const sim = await client?.estimateContractGas({
          ...options,
          account: account.address,
        });

        console.log({ listGas: sim });

        const tx = await writeContract?.({
          ...options,
          gas: (sim as bigint) + BigInt(100000),
        });

        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: tx,
        });

        if (transactionReceipt) {
          const response = await api.post("/listing/create", {
            seller: account.address,
            ticketId: ticket._id,
            signature,
            price,
          });
          console.log({ response });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return { approveTransfer, signTypedData, listTicket };
};

export default useListTicket;
