"use client";

import { usePrivy } from "@privy-io/react-auth";

import useEventContract from "@/contracts/Event";
import useKernelClient from "@/hooks/useKernelClient";
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
  const { ready, account, kernelClient } = useKernelClient();
  const verifyTicketData = async (ticketData: TicketData) => {
    const verificationType = ticketData.eventObj.verificationType;

    let verificationData;

    switch (verificationType) {
      default: {
        verificationData = await verification_default(
          ticketData,
          // kernelClient,
          signMessage,
          account
        );
      }
    }

    return verificationData;
  };

  return { verifyTicketData };
};

export default useTicketVerification;
