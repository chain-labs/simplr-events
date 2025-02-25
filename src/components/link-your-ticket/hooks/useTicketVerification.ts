"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useWalletClient } from "wagmi";

import useEventContract from "@/contracts/Event";
import verification_default from "@/lib/verification-functions/default";
import { Event } from "@/types/event";

export type TicketData = {
  seat: string;
  orderNumber: string;
  eventObj: Event;
};

const useTicketVerification = () => {
  const EventContract = useEventContract();
  const { signMessage } = usePrivy();
  const account = useAccount();

  const { data: walletClient, isFetched: walletFetched } = useWalletClient();

  const verifyTicketData = async (ticketData: TicketData) => {
    let verificationData;
    const verificationType = ticketData.eventObj.verificationType;
    if (walletFetched && walletClient) {
      switch (verificationType) {
        default: {
          verificationData = await verification_default(
            ticketData,
            walletClient.signMessage,
            account.address
          );
        }
      }
    }
    return verificationData;
  };

  return { verifyTicketData };
};

export default useTicketVerification;
