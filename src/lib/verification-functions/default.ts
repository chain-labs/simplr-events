"use client";

import { concat, encodeAbiParameters, keccak256 } from "viem";

import { TicketData } from "@/components/link-your-ticket/hooks/useTicketVerification";

const verification_default = async (
  ticketData: TicketData,
  signMessage: any,
  account: `0x${string}` | undefined
) => {
  const { orderNumber, eventObj } = ticketData;
  const { contractAddress } = eventObj;
  const messageHash = concat([
    contractAddress as `0x${string}`,
    Number(orderNumber).toString(16) as `0x${string}`,
  ]);

  console.log({ messageHash });

  if (!signMessage) {
    return;
  }

  const signature = await signMessage(
    { message: messageHash },
    {
      uiOptions: {
        description: "Verification",
        buttonText: "Yes, I confirm",
        showWalletUIs: true,
        title: "Confirm Your Ticket",
        cancellable: true,
      },
    }
  );

  console.log({ signature });

  const data = encodeAbiParameters(
    [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
    [account ?? "0x", BigInt(orderNumber), signature ?? "0x"]
  );

  console.log({ data });

  return data;
};

export default verification_default;
