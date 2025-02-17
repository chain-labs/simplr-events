"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/utils/cn";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PLarge, PSmall } from "../ui/paragraph";
import Select from "../ui/select";

function TicketDetails({
  ticket,
  state,
  className,
}: {
  ticket: {
    price: string;
    orderId: string;
    seat: string;
    startDate: string;
    endDate: string;
    other: string;
  };
  state: "message" | "cancelling-reason" | "cancelling-success";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[16px]", className)}>
      <H4 className="text-simpleGray700">
        {state === "message" ? "Sell your ticket" : "Ticket details"}
      </H4>
      {state === "message" && (
        <PSmall className="font-bold text-simpleGray700">
          ⚠️ Failure in sending the ticket to the buyer will result in
          auto-rejection of your sale.
        </PSmall>
      )}

      {/* ticket price */}
      <ComponentWithLabel label="Price" gap={6}>
        <PLarge className="text-simpleGray700">{ticket.price}</PLarge>
      </ComponentWithLabel>

      {/* ticket id */}
      <ComponentWithLabel label="Event Ticket ID" gap={6}>
        <PLarge className="text-simpleGray700">{ticket.orderId}</PLarge>
      </ComponentWithLabel>

      {/* seat number */}
      <ComponentWithLabel label="Your Seat" gap={6}>
        <PLarge className="text-simpleGray700">Seat {ticket.seat}</PLarge>
      </ComponentWithLabel>

      {/* ṣtart and end date */}
      <div className="flex flex-wrap gap-[32px] md:flex-row">
        <ComponentWithLabel label="Start Date" gap={6}>
          <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
            {ticket.startDate}
          </PSmall>
        </ComponentWithLabel>
        <ComponentWithLabel label="End Date" gap={6}>
          <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
            {ticket.endDate}
          </PSmall>
        </ComponentWithLabel>
      </div>

      {/* other */}
      <ComponentWithLabel label="Another Field" gap={6}>
        <PSmall className="font-bold text-simpleGray700">{ticket.other}</PSmall>
      </ComponentWithLabel>
    </div>
  );
}

function CancellingReason() {
  const disputeReasonsSelection = [
    "Expired ticket",
    "Invalid ticket",
    "Different seat/day/other detail from what it was listed",
    "Changed my mind / plans",
  ];
  const [selectedReason, setSelectedReason] = useState<string>("");

  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Please tell us why you're disputing this sale.
      </H4>
      <Select
        options={disputeReasonsSelection}
        onSelect={setSelectedReason}
        allowUserInput
        userInputPlaceholder="Provide another reason..."
      />
      <Button>submit</Button>
    </div>
  );
}

function CancellingSuccess() {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[16px]">
        <H4 className="text-simpleGray700">
          Give us 2 days to look into this.
        </H4>
        <PSmall>
          <Link href="/contact-us" className="font-bold underline">
            Contact us
          </Link>{" "}
          if you haven't received a response in 2 days.
        </PSmall>
      </div>
      <Button>go home</Button>
    </div>
  );
}

export default function SendTicketToBuyer() {
  const ticket = {
    price: "$500.00",
    orderId: "OD123456789",
    seat: "2B",
    startDate: "Oct 14, 2024 | 11AM ET",
    endDate: "Oct 24, 2024 | 12PM ET",
    other: "Field Detail Info",
  };

  const [state, setState] = useState<
    "message" | "cancelling-reason" | "cancelling-success"
  >("cancelling-success");
  return (
    <Container className="max-w-[1000px] md:my-[50px]">
      <div
        className={cn(
          state !== "message"
            ? "flex flex-col gap-[32px] md:flex-row md:gap-[64px]"
            : "flex flex-col gap-[32px] md:flex-col md:gap-[32px]"
        )}
      >
        <TicketDetails
          ticket={ticket}
          state={state}
          className="flex md:hidden"
        />
        {state === "cancelling-reason" && <CancellingReason />}
        {state === "cancelling-success" && <CancellingSuccess />}
        <TicketDetails
          ticket={ticket}
          state={state}
          className="hidden md:flex"
        />
        {state === "message" && (
          <div className="flex flex-col gap-[8px]">
            <PSmall className="text-simpleGray700">
              Please confirm that you've sent the ticket to the buyer.
            </PSmall>
            <div className="flex flex-col gap-[8px] md:flex-row">
              <Button>yes, I've sent the ticket</Button>
              <Button variant="outline-danger">no, cancel this sale</Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
