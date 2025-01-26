"use client";

import { concat, encodeAbiParameters, keccak256 } from "viem";

import { TicketData } from "@/components/link-your-ticket/hooks/useTicketVerification";

const verification_default = async (
  ticketData: TicketData,
  kernelClient: any,
  account: `0x${string}` | undefined
) => {
  const { orderNumber, eventObj } = ticketData;
  const { contractAddress } = eventObj;
  const messageHash = keccak256(
    concat([
      contractAddress as `0x${string}`,
      Number(orderNumber).toString(16) as `0x${string}`,
    ])
  );

  if (!kernelClient) {
    return;
  }

  const signature = await kernelClient?.signMessage({ message: messageHash });

  const data = encodeAbiParameters(
    [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
    [account ?? "0x", BigInt(orderNumber), signature ?? "0x"]
  );

  console.log({ data });

  return data;
};

export default verification_default;
