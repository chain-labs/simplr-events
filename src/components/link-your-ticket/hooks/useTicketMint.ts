import React from "react";

import { encodeFunctionData, keccak256, toBytes } from "viem";

import useEventContract from "@/contracts/Event";
import useKernelClient from "@/hooks/useKernelClient";
import { Event } from "@/types/event";
import api from "@/utils/axios";
import { envVars } from "@/utils/envVars";

const useTicketMint = () => {
  const EventContract = useEventContract();
  const { kernelClient } = useKernelClient();
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
    if (!kernelClient) return null;
    await uploadNftMetadata(tokenId, eventObj, seat, orderNumber);
    const options = {
      address: eventObj?.contractAddress,
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
    // @ts-expect-error
    const userOpHash = await kernelClient?.signUserOperation({
      callData: await kernelClient?.account?.encodeCalls([
        {
          to: eventObj.contractAddress as `0x${string}`,
          data: encodeFunctionData({
            abi: options.abi,
            functionName: options.functionName,
            args: [...options.args],
          }),
        },
      ]),
      callGasLimit: BigInt("1000000"),
      verificationGasLimit: BigInt("10000000"),
      preVerificationGas: BigInt("1000000"),
    });

    console.log({ userOpHash });

    // const receipt = await kernelClient?.waitForUserOperationReceipt({
    //   hash: userOpHash,
    // });

    // const userOpHash = await kernelClient?.sendUserOperation({
    //   callData: await kernelClient?.account?.encodeCalls([
    //     {
    //       to: eventObj.contractAddress,
    //       data: encodeFunctionData({
    //         abi: EventContract.abi,
    //         functionName: "createTicket",
    //         args: [args1, args2],
    //       }),
    //     },
    //   ]),
    // });
    console.log({ options });
    return tokenId;
  };

  return {
    mintTicket,
  };
};

export default useTicketMint;
