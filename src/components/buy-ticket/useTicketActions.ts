import React, { useEffect, useState } from "react";

import { waitForTransactionReceipt } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";

import useMarketplaceContract from "@/contracts/Marketplace";
import useUSDCContract from "@/contracts/USDC";
import { Order } from "@/types/ticket";
import api from "@/utils/axios";

const useTicketActions = () => {
  const [allowance, setAllowance] = useState<bigint>(BigInt(0));
  const { writeContractAsync: writeContract } = useWriteContract();
  const account = useAccount();
  const USDC = useUSDCContract();
  const MarketplaceContract = useMarketplaceContract();
  const { data: allowanceData } = useReadContract({
    abi: USDC.abi,
    address: USDC.address,
    functionName: "allowance",
  });

  const config = useConfig();
  const client = usePublicClient();

  useEffect(() => {
    if (allowanceData) {
      setAllowance(allowanceData as bigint);
    }
  }, [allowanceData]);

  const allowFundsTransfer = async (fund: bigint) => {
    const tx = await writeContract({
      abi: USDC.abi,
      address: USDC.address as `0x${string}`,
      functionName: "approve",
      args: [MarketplaceContract.address, fund],
    });

    const receipt = await waitForTransactionReceipt(config, { hash: tx });
  };

  const buyTicket = async (order: Order, seller: string) => {
    if ((allowance as bigint) < BigInt(order.price)) {
      try {
        await allowFundsTransfer(BigInt(order.price));
        setAllowance(BigInt(order.price));
      } catch (error) {
        console.log("Error setting allowance");
        return;
      }
    }
    const options = {
      abi: MarketplaceContract.abi,
      address: MarketplaceContract.address,
      functionName: "purchaseTicket",
      args: [
        {
          eventContract: order.ticket.event.contractAddress,
          tokenId: BigInt(order.ticket.tokenId),
          price: BigInt(order.price),
          seller: seller,
          deadline: BigInt(order.ticket.event.deadline),
        },
        order.signature,
      ],
    };

    try {
      const sim = await client?.estimateGas({
        ...options,
        account: account.address,
      });
      const tx = await writeContract({
        ...options,
        gas: BigInt(Math.max(Number(sim as bigint) + 200000, 1000000)),
      });

      await waitForTransactionReceipt(config, { hash: tx });

      await api.post("/listing/sold", {
        ticketId: order.ticket._id,
        eventId: order.ticket.event._id,
        buyerAddress: account.address,
        expiryHours: "24",
      });
    } catch (error) {
      console.log("Error while buying ticket");
    }
  };

  return { buyTicket };
};

export default useTicketActions;
