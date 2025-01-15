import React, { useCallback } from "react";

import { concat, encodeAbiParameters, keccak256 } from "viem";

import useKernelClient from "@/hooks/useKernelClient";

const useLinkTicket = () => {
  const { kernelClient, kernelAccount, ready } = useKernelClient();

  const handleVerify = useCallback(
    async (contract: `0x${string}`, orderNumber: string) => {
      if (!kernelClient || !kernelAccount) {
        return null;
      }
      const sign = kernelClient.signMessage;
      const messageHash = keccak256(
        concat([contract, Number(orderNumber).toString(16) as `0x${string}`])
      );

      // @ts-expect-error sign not typed correctly
      const signature = await sign({
        message: messageHash,
      });

      if (signature) {
        const ticketData = encodeAbiParameters(
          [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
          [kernelAccount.address ?? "0x", BigInt(orderNumber), signature]
        );

        console.log({ ticketData });
        return ticketData;
      }

      return null;
    },
    [kernelClient, kernelAccount]
  );

  return { handleVerify, ready };
};

export default useLinkTicket;
