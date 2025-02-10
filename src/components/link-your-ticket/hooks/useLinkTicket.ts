import React, { useCallback } from "react";

import { concat, encodeAbiParameters, keccak256 } from "viem";

import useKernelClient from "@/hooks/useKernelClient";
import useNexusClient from "@/hooks/useNexusClient";

const useLinkTicket = () => {
  // const { kernelClient, kernelAccount, ready } = useKernelClient();
  const { sendDummyTx, nexusClient, accountAddress } = useNexusClient();

  const handleVerify = useCallback(async () => {
    // if (!kernelClient || !kernelAccount) {
    //   return null;
    // }
    // const sign = kernelClient.signMessage;
    // const messageHash = keccak256(
    //   concat([contract, Number(orderNumber).toString(16) as `0x${string}`])
    // );
    // // @ts-expect-error sign not typed correctly
    // const signature = await sign({
    //   message: messageHash,
    // });
    // if (signature) {
    //   const ticketData = encodeAbiParameters(
    //     [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
    //     [kernelAccount.address ?? "0x", BigInt(orderNumber), signature]
    //   );
    //   console.log({ ticketData });
    //   return ticketData;
    // }
    // return null;

    // Nexus Client

    if (!nexusClient) {
      return null;
    }

    await sendDummyTx();
  }, [nexusClient, sendDummyTx]);

  return { handleVerify };
};

export default useLinkTicket;
