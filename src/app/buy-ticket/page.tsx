"use client";

import { useState } from "react";

import {
  Confirmation,
  Details,
  Dispute,
  DisputeConfirmation,
  Success,
  TicketDetails,
} from "@/components/buy-ticket/ticket-detail";
import Container from "@/components/component/container";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import { cn } from "@/utils/cn";

export default function BuyTicket() {
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];
  const ticket = {
    price: "$500.00",
    orderId: "OD123456789",
    seat: "2B",
    startDate: "Oct 14, 2024 | 11AM ET",
    endDate: "Oct 24, 2024 | 12PM ET",
    other: "Field Detail Info",
  };

  const [state, setState] = useState<
    | "details"
    | "confirmation"
    | "success"
    | "dispute"
    | "dispute-confirmation"
    | "sold-out"
  >("sold-out");
  return (
    <>
      <Container className="my-[16px] max-w-[1000px] md:my-[50px]">
        <div
          className={cn("flex flex-col gap-[32px] md:flex-row md:gap-[64px]")}
        >
          <TicketDetails
            ticket={ticket}
            state={state}
            parentClassName={cn(
              "flex md:hidden",
              state === "confirmation" && "hidden"
            )}
          />
          {state === "details" && <Details />}
          {state === "confirmation" && <Confirmation />}
          {state === "success" && <Success />}
          {state === "dispute" && <Dispute />}
          {state === "dispute-confirmation" && <DisputeConfirmation />}
          <TicketDetails
            ticket={ticket}
            state={state}
            parentClassName={cn(
              "hidden md:flex",
              state === "confirmation" && "flex"
            )}
          />
        </div>
      </Container>
      <FooterProgressBar
        STEPS={footerSteps}
        active="Start selling your ticket"
      />
    </>
  );
}
