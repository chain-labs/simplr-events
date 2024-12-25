"use client";

import { Dispatch, SetStateAction } from "react";

import { PiSealWarningDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";

import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { List } from "../ui/list";
import { PSmall } from "../ui/paragraph";
import TicketCardComponent from "./ticket-card-component";
import TicketSearchComponent from "./ticket-search-component";

type SellingLinkedTicketProps = {
  setSelectedTickets: Dispatch<SetStateAction<Ticket[]>>;
  selectedTickets: Ticket[];
};

export default function SellingLinkedTicket({
  setSelectedTickets,
  selectedTickets,
}: SellingLinkedTicketProps) {
  const dummyEvents = dummyTickets.map((ticket) => ticket.eventName);
  const HowToSecureYourSales = [
    "You list the ticket for sale today.",
    "When a Buyer decides to buy it, they make a payment—which is stored in our escrow.",
    "Buyer verifies the ticket and confirms that they've received it.",
    "If everything's okay and Buyer verifies & confirms the ticket: We transfer their payment to you.",
    "If Buyer refuses the ticket: We reverse their payment back to them. We notify you of the refusal of the ticket.",
  ];
  return (
    <div className="m-auto grid max-w-[1000px] grid-cols-[auto_auto] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-[320px] flex-col gap-[16px]">
        <H4>Sell your ticket</H4>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose your event
          <Dropdown options={dummyEvents} placeholder="Select event" />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose the tickets to sell
          <TicketSearchComponent
            selectedTickets={selectedTickets}
            setSelectedTickets={setSelectedTickets}
          />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Suggested ticket:
          <TicketCardComponent {...{ ...dummyTickets[0], status: "grey" }} />
        </label>
      </div>
      <div className="flex w-full flex-col gap-[16px]">
        <H4>How we secure your sales</H4>
        <ul className="list-decimal">
          <PSmall className="text-simpleGray700">
            <List items={HowToSecureYourSales} />
            <div className="mt-[16px] grid grid-cols-[24px_auto] gap-[8px] rounded-[16px] bg-[#F2FF49A8] p-[16px]">
              {/* @ts-expect-error */}
              <PiSealWarningDuotone className="text-[24px] text-simpleRed" />
              <span>
                Please be warned that multiple violations in bad faith
                (uploading expired/invalid tickets) could lead to a permanent
                deactivation of your account.
              </span>
            </div>
          </PSmall>
        </ul>
      </div>
      <div className="col-span-2 flex w-full flex-col gap-[16px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Your selected tickets:
        </label>
        <div className="flex flex-wrap gap-[8px]">
          {selectedTickets.map((ticket) => (
            <TicketCardComponent
              key={ticket.id}
              {...ticket}
              status="closable"
              onClose={() => {
                setSelectedTickets((prev) =>
                  prev.filter(
                    (selectedTicket) => selectedTicket.id !== ticket.id
                  )
                );
              }}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 flex w-full items-center justify-center">
        <Button>set price</Button>
      </div>
    </div>
  );
}
