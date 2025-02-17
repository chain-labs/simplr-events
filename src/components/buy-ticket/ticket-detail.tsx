"use client";

import Link from "next/link";
import React, { useState } from "react";

import { PiSealWarningDuotone } from "react-icons/pi";
import { formatUnits } from "viem";

import { Order } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { ComponentWithLabel } from "../component/component-with-label";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { List, ListProps } from "../ui/list";
import { PLarge, PSmall } from "../ui/paragraph";
import Select from "../ui/select";
import useTicketActions from "./useTicketActions";

export function TicketDetails({
  order,
  buyTicketFn,
  state,
  parentClassName,
  disabled,
}: {
  order: Order;
  buyTicketFn: () => void;
  state:
    | "details"
    | "confirmation"
    | "success"
    | "dispute"
    | "dispute-confirmation"
    | "sold-out";
  parentClassName?: string;
  disabled?: boolean;
}) {
  const [buyLoading, setBuyLoading] = React.useState(false);

  const handleBuy = async () => {
    setBuyLoading(true);
    await buyTicketFn();
    setBuyLoading(false);
  };

  return (
    <div className={cn("flex flex-col gap-[32px]", parentClassName)}>
      <div className="flex flex-col gap-[16px]">
        <H4 className="text-simpleGray700">Ticket details</H4>

        {/* price */}
        <ComponentWithLabel gap={6} label="Price">
          <PLarge className="text-simpleGray700">
            ${formatUnits(BigInt(order.price), 6)}
          </PLarge>
        </ComponentWithLabel>

        {/* order id */}
        <ComponentWithLabel gap={6} label="Event Ticket ID">
          <PLarge className="text-simpleGray700">{order.ticket.tokenId}</PLarge>
        </ComponentWithLabel>

        {/* seat */}
        <ComponentWithLabel gap={6} label="Your Seat">
          <PLarge className="text-simpleGray700">
            Seat {order.ticket.seat}
          </PLarge>
        </ComponentWithLabel>

        {/* start and end datetime */}
        <div className="flex flex-wrap gap-[16px] md:flex-row md:gap-[32px]">
          <ComponentWithLabel gap={6} label="Start Date">
            <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
              {order.ticket.event.startDateTime}
            </PSmall>
          </ComponentWithLabel>

          <ComponentWithLabel gap={6} label="End Date">
            <PSmall className="whitespace-nowrap font-bold text-simpleGray700">
              {order.ticket.event.endDateTime}
            </PSmall>
          </ComponentWithLabel>
        </div>

        {/* other field */}
        <ComponentWithLabel gap={6} label="Another Field">
          <PSmall className="font-bold text-simpleGray700">
            {order.ticket.event.additionalInfo[0]}
          </PSmall>
        </ComponentWithLabel>
      </div>

      {state === "confirmation" && (
        <div className="flex flex-col gap-[8px]">
          <PSmall>
            Check your email and/or wallet for the ticket. Please verify and
            confirm the ticket to process your payment.
          </PSmall>
          <div className="grid grid-cols-[24px_auto] gap-[8px] rounded-[16px] bg-[#F2FF49A8] p-[16px]">
            <PiSealWarningDuotone className="text-[24px] text-simpleRed" />
            <PSmall className="font-bold text-simpleGray700">
              Keep in mind that verifying and confirming the ticket is permanent
              and cannot be reversed.
            </PSmall>
          </div>
          <div className="grid grid-cols-[24px_auto] gap-[8px] rounded-[16px] bg-[#F2FF49A8] p-[16px]">
            <PiSealWarningDuotone className="text-[24px] text-simpleRed" />
            <PSmall className="font-bold text-simpleGray700">
              If you don't confirm the ticket within 48 hours, the ticket will
              be auto-confirmed on your behalf.
            </PSmall>
          </div>
        </div>
      )}
      {state === "confirmation" && (
        <div className="flex flex-wrap gap-[8px] md:flex-nowrap">
          <Button>verify & confirm ticket</Button>
          <Button variant="outline-danger">dispute Ticket</Button>
        </div>
      )}
      {state === "details" && (
        <div className="flex justify-between gap-[8px]">
          <Button variant="secondary">go back</Button>
          <Button
            disabled={disabled}
            onClick={handleBuy}
            isLoading={buyLoading}
          >
            buy ticket
          </Button>
        </div>
      )}
      {state === "sold-out" && <Button>sold out</Button>}
    </div>
  );
}

export function Details() {
  const HowToSecureYourPayments: ListProps["items"] = [
    "You make the payment for the ticket today. It is stored in our escrow. We don't transfer it to the Seller yet.",
    "You receive the ticket from the Seller.",
    <>
      You verify the ticket and confirm that you've received it.{" "}
      <b>
        {" "}
        Keep in mind, we check the legitimacy of all tickets on our platform by
        default, but do not assure 100% guarantee on expired/invalid tickets.
      </b>
    </>,
    {
      data: (
        <>
          If everything's okay and you verify & confirm the ticket: We transfer
          your payment from our escrow to the Seller.{" "}
          <ol className="list-outside list-disc pl-[16px]">
            <li>
              {" "}
              Your ticket is now available in your account. Go{" "}
              <Link href="/" className="font-bold underline">
                🏠 Home
              </Link>{" "}
              to view it.
            </li>
          </ol>
        </>
      ),
      className: "bg-[#FB62F640] p-[16px] rounded-[16px] md:mx-[-16px]",
    },
    {
      data: (
        <>
          If you feel like something's off about the ticket and refuse it: We
          reverse the payment back to your account from our escrow.{" "}
          <ol className="list-outside list-disc pl-[16px]">
            <li>
              {" "}
              In the event that this happens, we encourage you to view other
              tickets from the{" "}
              <Link href="/" className="font-bold underline">
                Marketplace
              </Link>
              .
            </li>
          </ol>
        </>
      ),
      className: "bg-[#FF424240] p-[16px] rounded-[16px] md:mx-[-16px]",
    },
  ];
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">How we secure your payments</H4>
      <List
        items={HowToSecureYourPayments}
        parentClassName="gap-[16px] text-simpleGray700"
      />
    </div>
  );
}

export function Confirmation() {
  const WhatHappensNext: ListProps["items"] = [
    "You receive the ticket from the Seller.",
    <>
      You verify the ticket and confirm that you've received it.{" "}
      <b>
        Keep in mind, we check the legitimacy of all tickets on our platform by
        default, but do not assure 100% guarantee on expired/invalid tickets.
      </b>
    </>,
    <>
      If everything's okay and you verify & confirm the ticket: We transfer your
      payment from our escrow to the Seller.{" "}
      <ol className="list-outside list-disc pl-[24px]">
        <li>
          Your ticket is now available in your account. Go{" "}
          <Link href="/" className="font-bold underline">
            {" "}
            🏠 Home{" "}
          </Link>{" "}
          to view it.
        </li>
      </ol>
    </>,
    <>
      If you feel like something's off about the ticket and refuse it: We
      reverse the payment back to your account from our escrow.{" "}
      <ol className="list-outside list-disc pl-[24px]">
        <li>
          In the event that this happens, we encourage you to view other tickets
          from the{" "}
          <Link href="/" className="font-bold underline">
            Marketplace
          </Link>
          .
        </li>
      </ol>
    </>,
  ];
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Your payment is in escrow!
        <br /> Here's what happens next...
      </H4>
      <List
        items={WhatHappensNext}
        parentClassName="gap-[16px] text-simpleGray700"
      />
    </div>
  );
}

export function Success() {
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Congrats on purchasing your ticket. Have fun at the event!
      </H4>
      <PSmall>
        Your ticket is now available in your account. Go{" "}
        <Link href="/" className="font-bold underline">
          {" "}
          🏠 Home{" "}
        </Link>{" "}
        to view it.
      </PSmall>
      <Link href="/" className="mt-[16px]">
        <Button>go home</Button>
      </Link>
    </div>
  );
}

export function Dispute() {
  const DisputeReasons = [
    "Expired Ticket",
    "Invalid Ticket",
    "Different seat/day/other detail from what it was listed",
    "Changed my mind / plans",
  ];

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Please tell us why you're disputing this ticket.
      </H4>
      <Select
        options={DisputeReasons}
        onSelect={setSelectedReason}
        allowUserInput
        userInputPlaceholder="Provide another reason..."
      />
      <Button>submit</Button>
    </div>
  );
}

export function DisputeConfirmation() {
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Give us 2 days to look into this and you'll receive a refund if your
        dispute is verified.
      </H4>
      <PSmall>
        <Link href="/contact-us" className="font-bold underline">
          Contact us
        </Link>{" "}
        if you haven't received a response in 2 days. <br /> <br /> We encourage
        you to view other tickets from the Marketplace. We don't want you to
        miss out on the event! .
      </PSmall>
      <Link href="/" className="mt-[16px]">
        <Button>go home</Button>
      </Link>
    </div>
  );
}
