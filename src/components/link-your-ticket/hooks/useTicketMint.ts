import React from "react";

import { waitForTransactionReceipt } from "@wagmi/core";
import { encodeFunctionData, keccak256, toBytes } from "viem";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useWriteContract,
} from "wagmi";

import useEventContract from "@/contracts/Event";
import useKernelClient from "@/hooks/useKernelClient";
import { Event } from "@/types/event";
import api from "@/utils/axios";
import { envVars } from "@/utils/envVars";

const useTicketMint = () => {
  const EventContract = useEventContract();
  const { kernelClient } = useKernelClient();
  const account = useAccount();
  const { writeContractAsync: mint } = useWriteContract();

  const config = useConfig();
  const client = usePublicClient();

  const uploadNftMetadata = async (
    tokenId: string,
    eventObj: Event,
    seat: string,
    orderNumber: string
  ) => {
    const data = {
      event: eventObj.contractAddress,
      tokenId: tokenId,
      seat: seat,
    };
    const uploadResponse = await api.post("/nft-metadata", data);
    console.log({
      uploadResponse,
    });
  };

  const mintTicket = async ({
    eventObj,
    tokenId,
    seat,
    orderNumber,
    ticketData,
  }: {
    eventObj: Event;
    tokenId: string;
    seat: string;
    orderNumber: string;
    ticketData: string;
  }) => {
    try {
      await uploadNftMetadata(tokenId, eventObj, seat, orderNumber);
      const options = {
        address: eventObj?.contractAddress as `0x${string}`,
        abi: EventContract?.abi,
        functionName: "createTicket",
        args: [
          {
            ticketSerialNumberHash: keccak256(toBytes(orderNumber)),
            seat: seat,
            verificationData: ticketData, // bytes data
            ticketEncryptedDataUri: "", // lit protocol's encrypted data
            ticketMetadata: `https://simplr-events-server-production.up.railway.app/nft-metadata/${eventObj.contractAddress}/${tokenId}`, // public metadata
          },
        ] as const,
      };

      const hash = await mint(options);

      const receipt = await waitForTransactionReceipt(config, { hash: hash });

      await api.post("/ticket/create", {
        seat: seat,
        orderNumber: orderNumber,
        tokenId: tokenId,
        eventId: eventObj.contractAddress,
        userId: account.address,
      });

      console.log({ receipt });
      return tokenId;
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  return {
    mintTicket,
  };
};

export default useTicketMint;
