"use client";

import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import axios from "axios";

import {
  Confirmation,
  Details,
  Dispute,
  DisputeConfirmation,
  SellerCancellingReason,
  SellerCancellingSuccess,
  Success,
  TicketDetails,
  TicketDetailsSkeleton,
} from "@/components/buy-ticket/ticket-detail";
import useTicketBuy from "@/components/buy-ticket/useTicketBuy";
import Container from "@/components/component/container";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import { cn } from "@/utils/cn";

import useTicketData from "../useTicketData";

export default function BuyTicket() {
  const resolvedParams = useParams();
  const ticketId = resolvedParams.ticketId as string;

  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const { listing, escrow, state, setState } = useTicketData(ticketId);

  const { buyTicket } = useTicketBuy();

  const buyTicketHandler = async () => {
    if (listing && escrow) {
      try {
        await buyTicket(listing, escrow?.seller);
        setState("confirmation");
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <>
      <Container className="my-[16px] max-w-[1000px] md:my-[50px]">
        <div
          className={cn("flex flex-col gap-[32px] md:flex-row md:gap-[64px]")}
        >
          {listing ? (
            <TicketDetails
              buyTicketFn={buyTicketHandler}
              setState={setState}
              order={listing}
              state={state}
              parentClassName={cn(
                "flex md:hidden",
                state === "confirmation" && "hidden"
              )}
              isLoading={false}
            />
          ) : (
            <TicketDetailsSkeleton
              parentClassName={cn(
                "flex md:hidden",
                state === "confirmation" && "hidden"
              )}
            />
          )}
          {state === "details" && <Details />}
          {state === "confirmation" && <Confirmation />}
          {state === "success" && <Success />}
          {state === "dispute" && (
            <Dispute
              tokenId={listing?.ticket.tokenId}
              eventContract={listing?.ticket.event.contractAddress}
              setState={setState}
            />
          )}
          {state === "dispute-confirmation" && <DisputeConfirmation />}
          {state === "seller-dispute" && (
            <SellerCancellingReason
              tokenId={listing?.ticket.tokenId}
              eventContract={listing?.ticket.event.contractAddress}
              setState={setState}
              buyer={escrow?.buyer ?? ""}
            />
          )}
          {state === "seller-dispute-confirmation" && (
            <SellerCancellingSuccess />
          )}

          {listing ? (
            <TicketDetails
              buyTicketFn={buyTicketHandler}
              setState={setState}
              order={listing}
              state={state}
              parentClassName={cn(
                "hidden md:flex",
                state === "confirmation" && "flex"
              )}
              isLoading={false}
            />
          ) : (
            <TicketDetailsSkeleton
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
