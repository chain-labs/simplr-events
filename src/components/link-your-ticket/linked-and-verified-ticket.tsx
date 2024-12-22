"use client";

import {
  PiCalendarDotDuotone,
  PiCalendarDotsDuotone,
  PiInfoDuotone,
  PiMoneyWavyDuotone,
  PiShootingStarDuotone,
} from "react-icons/pi";

import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { LabelSmall } from "../ui/label";
import { PSmall } from "../ui/paragraph";

type TicketHistory = {
  ticketId: string;
  value: "average" | "highest" | "lowest";
  name: string;
  price: string;
  seat: string;
  seatId: string;
  startdate: string;
  endDate: string;
  startDay: number;
  endDay: number;
  otherDetails: string;
};

export default function LinkedAndVerifiedTicket() {
  const ticketsHistory: TicketHistory[] = [
    {
      ticketId: "1",
      value: "average",
      name: "devcon 2024",
      price: "$250",
      seat: "Seat 2B",
      seatId: "OD12345678",
      startdate: "Sep 23, 2024",
      endDate: "Sep 25, 2024",
      startDay: 1,
      endDay: 3,
      otherDetails: "Additional Feilds Data",
    },
    {
      ticketId: "2",
      value: "highest",
      name: "devcon 2024",
      price: "$500",
      seat: "Seat 2B",
      seatId: "OD12345678",
      startdate: "Sep 23, 2024",
      endDate: "Sep 25, 2024",
      startDay: 1,
      endDay: 3,
      otherDetails: "Additional Feilds Data",
    },
    {
      ticketId: "3",
      value: "lowest",
      name: "devcon 2024",
      price: "$100",
      seat: "Seat 2B",
      seatId: "OD12345678",
      startdate: "Sep 23, 2024",
      endDate: "Sep 25, 2024",
      startDay: 1,
      endDay: 3,
      otherDetails: "Additional Feilds Data",
    },
  ];
  return (
    <div className="m-auto mt-[25px] flex max-w-[950px] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-fit flex-col gap-[8px]">
        <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
          Similar tickets are being sold at:
        </p>
        <div className="flex flex-col gap-[8px]">
          {ticketsHistory.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="grid-flex-row grid gap-[8px] rounded-[16px] bg-simpleGray200 p-[16px]"
            >
              <div
                className={cn(
                  "w-fit rounded-full px-[16px] py-[8px] text-[12px] font-semibold uppercase leading-[15.6px] tracking-[0.1em]",
                  ticket.value === "average"
                    ? "bg-simpleYellow text-simpleGray900"
                    : ticket.value === "highest"
                      ? "bg-simpleGreen text-simpleWhite"
                      : "bg-simpleBlue text-simpleWhite"
                )}
              >
                {ticket.value} Price
              </div>
              <div className="flex flex-col items-start justify-start gap-[4px]">
                <LabelSmall>
                  <PiMoneyWavyDuotone />
                  Price
                </LabelSmall>
                <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
                  {ticket.price}
                </p>
              </div>
              <div className="bg-simpleGray400 h-[1px] w-full" />
              <div className="flex items-center gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
                <PiShootingStarDuotone className="text-[24px]" />
                {ticket.name}
              </div>
              <div className="flex flex-col">
                <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
                  {ticket.seat}
                </p>
                <p className="flex gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
                  {ticket.seatId}
                </p>
              </div>
              <div className="bg-simpleGray400 h-[1px] w-full" />
              <div className="grid grid-flow-col items-center gap-[8px]">
                <div className="flex flex-col gap-[4px] whitespace-nowrap">
                  <LabelSmall>
                    <PiCalendarDotDuotone />
                    Start Date
                  </LabelSmall>

                  <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                    {ticket.startdate} | Day {ticket.startDay}
                  </p>
                </div>
                <div className="bg-simpleGray400 h-full w-[1px]" />
                <div className="flex flex-col gap-[4px] whitespace-nowrap">
                  <LabelSmall>
                    <PiCalendarDotsDuotone />
                    End Date
                  </LabelSmall>
                  <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                    {ticket.endDate} | Day {ticket.endDay}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[4px]">
                <LabelSmall>
                  <PiInfoDuotone />
                  Additional Feild
                </LabelSmall>
                <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
                  {ticket.otherDetails}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <H4>Your ticket has been linked & verified as authentic!</H4>

          <div className="flex flex-col gap-[8px]">
            <PSmall className="text-simpleGray700">
              You can now sell your ticket.
            </PSmall>
            <Button>sell my ticket</Button>
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
          <Button variant="secondary">go home</Button>
        </div>
      </div>
    </div>
  );
}
