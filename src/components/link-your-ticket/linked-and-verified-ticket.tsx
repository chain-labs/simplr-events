"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  PiCalendarDotDuotone,
  PiCalendarDotsDuotone,
  PiInfoDuotone,
  PiMoneyWavyDuotone,
  PiShootingStar,
} from "react-icons/pi";
import { formatUnits } from "viem";

import { Order } from "@/types/ticket";
import api from "@/utils/axios";
import { cn } from "@/utils/cn";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { LabelSmall } from "../ui/label";
import { PSmall } from "../ui/paragraph";

function TicketSuggestionCard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/listing/examples?network=base").then((res) => {
      setOrders(res.data.examples);
    });
  }, []);

  return (
    <div className="flex flex-col gap-[8px]">
      {orders?.map((order, index) => (
        <div
          key={order.ticket._id}
          className="grid-flex-row grid gap-[8px] rounded-[16px] bg-simpleGray200 p-[16px]"
        >
          {/* price category tag */}
          <div
            className={cn(
              "w-fit rounded-full px-[16px] py-[8px] text-[12px] font-semibold uppercase leading-[15.6px] tracking-[0.1em]",
              index === 1
                ? "bg-simpleYellow text-simpleGray900"
                : index === 2
                  ? "bg-simpleGreen text-simpleWhite"
                  : "bg-simpleBlue text-simpleWhite"
            )}
          >
            {index === 1 ? "average" : index === 2 ? "highest" : "lowest"} Price
          </div>

          {/* price */}
          <div className="flex flex-col items-start justify-start gap-[4px]">
            <LabelSmall className="text-simpleGray700">
              <PiMoneyWavyDuotone />
              Price
            </LabelSmall>
            <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
              ${formatUnits(BigInt(order.price), 6)}
            </p>
          </div>

          <div className="h-[1px] w-full bg-simpleGray400" />

          {/* event, seat and ticketid */}
          <div className="flex items-center gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
            <PiShootingStar size={24} />
            {order.ticket.event.eventName}
          </div>
          <div className="flex flex-col">
            <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
              {order.ticket.seat}
            </p>
            <p className="flex gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
              {order.ticket._id}
            </p>
          </div>

          <div className="h-[1px] w-full bg-simpleGray400" />

          {/* start and end date */}
          <div className="grid grid-flow-col items-center gap-[8px]">
            <div className="flex flex-col gap-[4px] whitespace-nowrap">
              <LabelSmall className="text-simpleGray700">
                <PiCalendarDotDuotone />
                Start Date
              </LabelSmall>

              <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                {order.ticket.event.endDateTime}
              </p>
            </div>
            <div className="h-full w-[1px] bg-simpleGray400" />
            <div className="flex flex-col gap-[4px] whitespace-nowrap">
              <LabelSmall className="text-simpleGray700">
                <PiCalendarDotsDuotone />
                End Date
              </LabelSmall>
              <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                {order.ticket.event.endDateTime}
              </p>
            </div>
          </div>

          {/* additional info */}
          <div className="flex flex-col gap-[4px]">
            <LabelSmall className="text-simpleGray700">
              <PiInfoDuotone />
              Additional Feild
            </LabelSmall>
            <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
              {order.ticket.event.additionalInfo}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LinkedAndVerifiedTicket() {
  return (
    <>
      <ComponentWithLabel
        label="Similar tickets are being sold at:"
        className="m-[16px] flex text-simpleWhite md:hidden"
      >
        <TicketSuggestionCard />
      </ComponentWithLabel>
      <Container className="mb-[16px] max-w-[950px] md:my-[50px]">
        <div className="flex md:gap-[64px]">
          {/* suggestion */}
          <ComponentWithLabel
            label="Similar tickets are being sold at:"
            className="hidden md:flex"
          >
            <TicketSuggestionCard />
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
    </>
  );
}
