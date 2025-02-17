import React, { useEffect } from "react";

import { useAccount } from "wagmi";

import { Order } from "@/types/ticket";
import api from "@/utils/axios";

export interface Escrow {
  isEscrow: boolean;
  buyer: string;
  seller: string;
  isDisputed: boolean;
  isResolved: boolean;
}

const useTicketData = (ticketId: string) => {
  const [listing, setListing] = React.useState<Order>();
  const [escrow, setEscrow] = React.useState<Escrow>();
  const [state, setState] = React.useState<
    | "details"
    | "confirmation"
    | "success"
    | "dispute"
    | "dispute-confirmation"
    | "sold-out"
  >("details");

  const account = useAccount();

  useEffect(() => {
    if (ticketId)
      api.get(`/listing/${ticketId}?network=${"base"}`).then(({ data }) => {
        const { order, escrow } = data;
        setListing(order);
        setEscrow(escrow);
      });
  }, [ticketId]);

  useEffect(() => {
    if (escrow?.isEscrow) {
      if (!escrow.isResolved && !escrow.isDisputed) {
        if (account.address?.toLowerCase() === escrow.seller.toLowerCase()) {
          setState("dispute");
        } else if (
          account.address?.toLowerCase() === escrow.buyer.toLowerCase()
        ) {
          setState("confirmation");
        }
      }
    } else {
      setState("sold-out");
    }
  }, [escrow]);

  return { listing, escrow, state, setState };
};

export default useTicketData;
