"use client";

import useEventContract from "@/contracts/Event";
import useKernelClient from "@/hooks/useKernelClient";
import useNexusClient from "@/hooks/useNexusClient";
import verification_default from "@/lib/verification-functions/default";
import { Event } from "@/types/event";

export type TicketData = {
  seat: string;
  orderNumber: string;
  eventObj: Event;
};

const useTicketVerification = () => {
  const EventContract = useEventContract();
  // const { ready, account, kernelClient } = useKernelClient();
  const { nexusClient, accountAddress } = useNexusClient();
  const verifyTicketData = async (ticketData: TicketData) => {
    const verificationType = ticketData.eventObj.verificationType;

    let verificationData;

    switch (verificationType) {
      default: {
        verificationData = await verification_default(
          ticketData,
          nexusClient,
          accountAddress ?? "0x"
        );
      }
    }

    return verificationData;
  };

  return { verifyTicketData };
};

export default useTicketVerification;
