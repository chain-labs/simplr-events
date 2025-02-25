"use client";

import Link from "next/link";
import React, { useState } from "react";

import { PiSealWarningDuotone } from "react-icons/pi";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { Order } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { ComponentWithLabel } from "../component/component-with-label";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { List, ListProps } from "../ui/list";
import { PLarge, PSmall } from "../ui/paragraph";
import Select from "../ui/select";
import useTicketActions from "./useTicketActions";

export type stateBuyPageStateType =
  | "details"
  | "confirmation"
  | "success"
  | "dispute"
  | "dispute-confirmation"
  | "sold-out"
  | "seller-ticket-detail"
  | "seller-confirmation"
  | "seller-dispute"
  | "seller-dispute-confirmation";

export function TicketDetails({
  order,
  buyTicketFn,
  state,
  parentClassName,
  disabled,
  setState,
  isLoading,
}: {
  order: Order;
  buyTicketFn: () => void;
  state: stateBuyPageStateType;
  parentClassName?: string;
  disabled?: boolean;
  setState: (state: stateBuyPageStateType) => void;
  isLoading: boolean;
}) {
  const [buyLoading, setBuyLoading] = React.useState(false);
  const { confirmBuy, actionLoading } = useTicketActions();

  const handleBuy = async () => {
    setBuyLoading(true);
    await buyTicketFn();
    setBuyLoading(false);
  };

  // If loading, return skeleton
  if (isLoading) {
    return <TicketDetailsSkeleton parentClassName={parentClassName} />;
  }
  return (
    <div className={cn("flex flex-col gap-[32px]", parentClassName)}>
      <div className="flex flex-col gap-[16px]">
        <H4 className="text-simpleGray700">
          {state === "seller-ticket-detail"
            ? "Sell your ticket"
            : "Ticket details"}
        </H4>

        {state === "seller-ticket-detail" && (
          <PSmall className="font-bold text-simpleGray700">
            ⚠️ Failure in sending the ticket to the buyer will result in
            auto-rejection of your sale.
          </PSmall>
        )}

        {/* price */}
        <ComponentWithLabel gap={6} label="Price">
          <PLarge className="text-simpleGray700">
            ${order?.price ? formatUnits(BigInt(order.price), 6) : "N/A"}
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
              If you don&apos;t confirm the ticket within 48 hours, the ticket
              will be auto-confirmed on your behalf.
            </PSmall>
          </div>
        </div>
      )}
      {state === "confirmation" && (
        <div className="flex flex-wrap gap-[8px] md:flex-nowrap">
          <Button
            onClick={async () => {
              try {
                await confirmBuy(
                  order.ticket.tokenId,
                  order.ticket.event.contractAddress
                );
                setState("success");
              } catch (error) {
                console.error(error);
              }
            }}
            isLoading={actionLoading}
          >
            verify & confirm ticket
          </Button>
          <Button variant="outline-danger">dispute Ticket</Button>
        </div>
      )}
      {state === "details" && (
        <div className="flex justify-between gap-[8px]">
          <Link href="/">
            <Button variant="secondary">go back</Button>
          </Link>
          {!!order.price ? (
            <Button
              disabled={disabled}
              onClick={handleBuy}
              isLoading={buyLoading}
            >
              buy ticket
            </Button>
          ) : (
            <Link href={`/sell-your-ticket?ticket=${order.ticket._id}`}>
              <Button>sell ticket</Button>
            </Link>
          )}
        </div>
      )}
      {state === "sold-out" && <Button>sold out</Button>}
      {state === "seller-ticket-detail" && (
        <div className="flex flex-col gap-[8px]">
          <PSmall className="text-simpleGray700">
            Please confirm that you&apos;ve sent the ticket to the buyer.
          </PSmall>
          <div className="flex flex-col gap-[8px] md:flex-row">
            <Button disabled>yes, I&apos;ve sent the ticket</Button>
            <Button
              variant="outline-danger"
              onClick={() => setState("seller-dispute")}
            >
              no, cancel this sale
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function TicketDetailsSkeleton({
  parentClassName,
}: {
  parentClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[32px]", parentClassName)}>
      <div className="flex flex-col gap-[16px]">
        {/* Title skeleton */}
        <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-simpleGray200" />

        {/* Price skeleton */}
        <ComponentWithLabel gap={6} label="Price">
          <div className="h-[24px] w-[80px] animate-pulse rounded-md bg-simpleGray200" />
        </ComponentWithLabel>

        {/* Event Ticket ID skeleton */}
        <ComponentWithLabel gap={6} label="Event Ticket ID">
          <div className="h-[24px] w-[100px] animate-pulse rounded-md bg-simpleGray200" />
        </ComponentWithLabel>

        {/* Seat skeleton */}
        <ComponentWithLabel gap={6} label="Your Seat">
          <div className="h-[24px] w-[120px] animate-pulse rounded-md bg-simpleGray200" />
        </ComponentWithLabel>

        {/* Date skeletons */}
        <div className="flex flex-wrap gap-[16px] md:flex-row md:gap-[32px]">
          <ComponentWithLabel gap={6} label="Start Date">
            <div className="h-[20px] w-[160px] animate-pulse rounded-md bg-simpleGray200" />
          </ComponentWithLabel>

          <ComponentWithLabel gap={6} label="End Date">
            <div className="h-[20px] w-[160px] animate-pulse rounded-md bg-simpleGray200" />
          </ComponentWithLabel>
        </div>

        {/* Additional Info skeleton */}
        <ComponentWithLabel gap={6} label="Another Field">
          <div className="h-[20px] w-[200px] animate-pulse rounded-md bg-simpleGray200" />
        </ComponentWithLabel>
      </div>

      {/* Button skeleton */}
      <div className="flex justify-between gap-[8px]">
        <div className="h-[40px] w-[100px] animate-pulse rounded-md bg-simpleGray200" />
        <div className="h-[40px] w-[100px] animate-pulse rounded-md bg-simpleGray200" />
      </div>
    </div>
  );
}

export function Details() {
  const HowToSecureYourPayments: ListProps["items"] = [
    "You make the payment for the ticket today. It is stored in our escrow. We don't transfer it to the Seller yet.",
    "You receive the ticket from the Seller.",
    <>
      You verify the ticket and confirm that you&apos;ve received it.{" "}
      <b>
        {" "}
        Keep in mind, we check the legitimacy of all tickets on our platform by
        default, but do not assure 100% guarantee on expired/invalid tickets.
      </b>
    </>,
    {
      data: (
        <>
          If everything&apos;s okay and you verify & confirm the ticket: We
          transfer your payment from our escrow to the Seller.{" "}
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
          If you feel like something&apos;s off about the ticket and refuse it:
          We reverse the payment back to your account from our escrow.{" "}
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
      You verify the ticket and confirm that you&apos;ve received it.{" "}
      <b>
        Keep in mind, we check the legitimacy of all tickets on our platform by
        default, but do not assure 100% guarantee on expired/invalid tickets.
      </b>
    </>,
    <>
      If everything&apos;s okay and you verify & confirm the ticket: We transfer
      your payment from our escrow to the Seller.{" "}
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
      If you feel like something&apos;s off about the ticket and refuse it: We
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
        <br /> Here&apos;s what happens next...
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

export function Dispute({
  tokenId,
  eventContract,
  setState,
}: {
  tokenId: string | undefined;
  eventContract: string | undefined;
  setState: (state: stateBuyPageStateType) => void;
}) {
  const DisputeReasons = [
    "Expired Ticket",
    "Invalid Ticket",
    "Different seat/day/other detail from what it was listed",
    "Changed my mind / plans",
  ];
  const { disputeTicket, actionLoading } = useTicketActions();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const account = useAccount();

  if (!tokenId || !eventContract) return;

  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Please tell us why you&apos;re disputing this ticket.
      </H4>
      <Select
        options={DisputeReasons}
        onSelect={setSelectedReason}
        allowUserInput
        userInputPlaceholder="Provide another reason..."
      />
      <Button
        onClick={async () => {
          if (selectedReason) {
            try {
              await disputeTicket(
                tokenId,
                eventContract,
                account.address as string,
                {
                  reason: selectedReason ?? "",
                  from: "Buyer",
                }
              );
              setState("dispute-confirmation");
            } catch (error) {
              console.error(error);
            }
          }
        }}
        isLoading={actionLoading}
        disabled={!selectedReason}
      >
        submit
      </Button>
    </div>
  );
}

export function DisputeConfirmation() {
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Give us 2 days to look into this and you&apos;ll receive a refund if
        your dispute is verified.
      </H4>
      <PSmall>
        <Link href="/contact-us" className="font-bold underline">
          Contact us
        </Link>{" "}
        if you haven&apos;t received a response in 2 days. <br /> <br /> We
        encourage you to view other tickets from the Marketplace. We don&apos;t
        want you to miss out on the event! .
      </PSmall>
      <Link href="/" className="mt-[16px]">
        <Button>go home</Button>
      </Link>
    </div>
  );
}

export function SellerConfirmation() {
  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">Your ticket are on sale!</H4>
      <div className="flex flex-col gap-[8px]">
        <PSmall className="text-simpleGray700">
          Go to the 🏠 Home page, where you can:
          <ul className="list-inside list-disc">
            <li>Manage all your tickets</li>
            <li>View other tickets on sale</li>
            <li>Go through other events happening around the world</li>
          </ul>
        </PSmall>
        <Link href="/">
          <Button>go home</Button>
        </Link>
      </div>
    </div>
  );
}

export function SellerCancellingReason({
  buyer,
  tokenId,
  eventContract,
  setState,
}: {
  buyer: string;
  tokenId: string | undefined;
  eventContract: string | undefined;
  setState: (state: stateBuyPageStateType) => void;
}) {
  const disputeReasonsSelection = [
    "Expired ticket",
    "Invalid ticket",
    "Different seat/day/other detail from what it was listed",
    "Changed my mind / plans",
  ];
  const [selectedReason, setSelectedReason] = useState<string>("");

  const { disputeTicket, actionLoading } = useTicketActions();

  if (!tokenId || !eventContract) return;

  return (
    <div className="flex flex-col gap-[16px]">
      <H4 className="text-simpleGray700">
        Please tell us why you&apos;re disputing this sale.
      </H4>
      <Select
        options={disputeReasonsSelection}
        onSelect={setSelectedReason}
        allowUserInput
        userInputPlaceholder="Provide another reason..."
      />
      <Button
        onClick={async () => {
          if (selectedReason) {
            await disputeTicket(tokenId, eventContract, buyer, {
              reason: selectedReason,
              from: "Seller",
            });
            setState("seller-dispute-confirmation");
          }
        }}
        isLoading={actionLoading}
        disabled={!selectedReason}
      >
        submit
      </Button>
    </div>
  );
}

export function SellerCancellingSuccess() {
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
          if you haven&apos;t received a response in 2 days.
        </PSmall>
      </div>
      <Button>go home</Button>
    </div>
  );
}
