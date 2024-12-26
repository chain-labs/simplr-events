"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PLarge, PSmall } from "../ui/paragraph";
import Select from "../ui/select";

function TicketDetails({
  ticket,
  state,
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
}) {
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        {state === "message" ? "Sell your ticket" : "Ticket details"}
      </H4>
      {state === "message" && (
        <PSmall className="font-bold text-simpleGray700">
          ⚠️ Failure in sending the ticket to the buyer will result in
          auto-rejection of your sale.
        </PSmall>
      )}
      <div className="flex flex-col gap-[6px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Order ID
        </label>
        <PLarge className="text-simpleGray700">{ticket.price}</PLarge>
      </div>
      <div className="flex flex-col gap-[6px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Event Ticket ID
        </label>
        <PLarge className="text-simpleGray700">{ticket.orderId}</PLarge>
      </div>
      <div className="flex flex-col gap-[6px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Your Seat
        </label>
        <PLarge className="text-simpleGray700">Seat {ticket.seat}</PLarge>
      </div>
      <div className="flex gap-[32px]">
        <div className="flex flex-col gap-[6px]">
          <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
            Start Date
          </label>
          <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
            {ticket.startDate}
          </PSmall>
        </div>
        <div className="flex flex-col gap-[6px]">
          <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
            End Date
          </label>
          <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
            {ticket.endDate}
          </PSmall>
        </div>
      </div>
      <div className="flex flex-col gap-[6px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Another Field
        </label>
        <PSmall className="font-bold text-simpleGray700">{ticket.other}</PSmall>
      </div>
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
      <H4>Please tell us why you're disputing this sale.</H4>
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
        <H4>Give us 2 days to look into this.</H4>
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
    <div
      className={cn(
        "m-auto flex max-w-[1000px] flex-col gap-[32px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]",
        state !== "message"
          ? "flex flex-row gap-[64px]"
          : "flex flex-col gap-[32px]"
      )}
    >
      {state === "cancelling-reason" && <CancellingReason />}
      {state === "cancelling-success" && <CancellingSuccess />}
      <TicketDetails ticket={ticket} state={state} />
      {state === "message" && (
        <div className="flex flex-col gap-[8px]">
          <PSmall>
            Please confirm that you've sent the ticket to the buyer.
          </PSmall>
          <div className="flex gap-[8px]">
            <Button>yes, I've sent the ticket</Button>
            <Button variant="outline-danger">no, cancel this sale</Button>
          </div>
        </div>
      )}
    </div>
  );
}
