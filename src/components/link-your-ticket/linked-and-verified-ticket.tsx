"use client";

import Link from "next/link";

import {
  PiCalendarDotDuotone,
  PiCalendarDotsDuotone,
  PiInfoDuotone,
  PiMoneyWavyDuotone,
} from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { dummyTickets } from "@/utils/dummyData";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { LabelSmall } from "../ui/label";
import { PSmall } from "../ui/paragraph";

function TicketSuggestionCard({
  ticketsHistory,
}: {
  ticketsHistory: Ticket[];
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      {ticketsHistory.map((ticket) => (
        <div
          key={ticket.ticketId}
          className="grid-flex-row grid gap-[8px] rounded-[16px] bg-simpleGray200 p-[16px]"
        >
          {/* price category tag */}
          <div
            className={cn(
              "w-fit rounded-full px-[16px] py-[8px] text-[12px] font-semibold uppercase leading-[15.6px] tracking-[0.1em]",
              ticket.priceCategory === "average"
                ? "bg-simpleYellow text-simpleGray900"
                : ticket.priceCategory === "highest"
                  ? "bg-simpleGreen text-simpleWhite"
                  : "bg-simpleBlue text-simpleWhite"
            )}
          >
            {ticket.priceCategory} Price
          </div>

          {/* price */}
          <div className="flex flex-col items-start justify-start gap-[4px]">
            <LabelSmall className="text-simpleGray700">
              {/* @ts-expect-error */}
              <PiMoneyWavyDuotone />
              Price
            </LabelSmall>
            <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
              {ticket.price}
            </p>
          </div>

          <div className="h-[1px] w-full bg-simpleGray400" />

          {/* event, seat and ticketid */}
          <div className="flex items-center gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
            {/* @ts-expect-error */}
            <ticket.EventIcon className="text-[24px]" />
            {ticket.eventName}
          </div>
          <div className="flex flex-col">
            <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
              {ticket.seat}
            </p>
            <p className="flex gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
              {ticket.orderId}
            </p>
          </div>

          <div className="h-[1px] w-full bg-simpleGray400" />

          {/* start and end date */}
          <div className="grid grid-flow-col items-center gap-[8px]">
            <div className="flex flex-col gap-[4px] whitespace-nowrap">
              <LabelSmall className="text-simpleGray700">
                {/* @ts-expect-error */}
                <PiCalendarDotDuotone />
                Start Date
              </LabelSmall>

              <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                {ticket.startDate} | Day {ticket.startDay}
              </p>
            </div>
            <div className="h-full w-[1px] bg-simpleGray400" />
            <div className="flex flex-col gap-[4px] whitespace-nowrap">
              <LabelSmall className="text-simpleGray700">
                {/* @ts-expect-error */}
                <PiCalendarDotsDuotone />
                End Date
              </LabelSmall>
              <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                {ticket.endDate} | Day {ticket.endDay}
              </p>
            </div>
          </div>

          {/* additional info */}
          <div className="flex flex-col gap-[4px]">
            <LabelSmall className="text-simpleGray700">
              {/* @ts-expect-error */}
              <PiInfoDuotone />
              Additional Feild
            </LabelSmall>
            <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
              {ticket.other}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LinkedAndVerifiedTicket() {
  // TODO: Replace dummyTickets with real data
  const ticketsHistory = dummyTickets;

  return (
    <Container className="my-[50px] max-w-[950px]">
      <div className="flex gap-[64px]">
        {/* suggestion */}
        <ComponentWithLabel label="Similar tickets are being sold at:">
          <TicketSuggestionCard ticketsHistory={ticketsHistory} />
        </ComponentWithLabel>

        {/* info */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <H4 className="text-simpleGray700">
              Your ticket has been linked & verified as authentic!
            </H4>

            <div className="flex flex-col gap-[8px]">
              <PSmall className="text-simpleGray700">
                You can now sell your ticket.
              </PSmall>
              <Link href="/sell-your-ticket">
                <Button>sell my ticket</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-[8px]">
              <PSmall className="text-simpleGray700">
                Learn how we establish trust with ticketing.
              </PSmall>
              <Button variant="secondary">how is it legit?</Button>
            </div>
          </div>

          <div className="h-[1px] w-full bg-simpleGray300" />

          <div className="flex flex-col gap-[8px]">
            <PSmall className="text-simpleGray700">
              Or, go to the 🏠 Home page, where you can:
              <li>Manage all your tickets</li>
              <li>View other tickets on sale</li>
              <li>Go through other events happening around the world</li>
            </PSmall>
            <Link href="/">
              <Button variant="secondary">go home</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
