"use client";

import { use, useEffect, useState } from "react";

import axios from "axios";

import {
  Confirmation,
  Details,
  Dispute,
  DisputeConfirmation,
  Success,
  TicketDetails,
} from "@/components/buy-ticket/ticket-detail";
import useTicketActions from "@/components/buy-ticket/useTicketActions";
import Container from "@/components/component/container";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import {
  TICKET_RESPONSE_TYPE,
  USER_TICKET_QUERY,
} from "@/gql/queries/user-tickets.query";
import { cn } from "@/utils/cn";
import { envVars } from "@/utils/envVars";

import useTicketData from "../useTicketData";

export default function BuyTicket({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.ticketId;

  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const { listing, escrow, state, setState } = useTicketData(ticketId);

  const { buyTicket } = useTicketActions();
  const buyTicketHandler = async () => {
    if (listing && escrow) {
      await buyTicket(listing, escrow?.seller);
      setState("confirmation");
    }
  };

  return (
    <>
      <Container className="my-[16px] max-w-[1000px] md:my-[50px]">
        <div
          className={cn("flex flex-col gap-[32px] md:flex-row md:gap-[64px]")}
        >
          {listing && (
            <TicketDetails
              buyTicketFn={buyTicketHandler}
              order={listing}
              state={state}
              parentClassName={cn(
                "flex md:hidden",
                state === "confirmation" && "hidden"
              )}
            />
          )}
          {state === "details" && <Details />}
          {state === "confirmation" && <Confirmation />}
          {state === "success" && <Success />}
          {state === "dispute" && <Dispute />}
          {state === "dispute-confirmation" && <DisputeConfirmation />}
          {listing && (
            <TicketDetails
              buyTicketFn={buyTicketHandler}
              order={listing}
              state={state}
              parentClassName={cn(
                "hidden md:flex",
                state === "confirmation" && "flex"
              )}
            />
          )}
        </div>
      </Container>
      <FooterProgressBar
        STEPS={footerSteps}
        active="Start selling your ticket"
      />
    </>
  );
}
