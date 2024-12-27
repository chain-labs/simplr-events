"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { PiSealWarningDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
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

  // when user visit it for first time or user haven't linked any ticket
  const [firstTime, setFirstTime] = useState(true);
  return (
    <Container className="my-[50px] max-w-[1000px]">
      <div className="grid grid-cols-[auto_auto] gap-[64px]">
        <div className="flex w-[320px] flex-col gap-[16px]">
          <H4 className="text-simpleGray700">Sell your ticket</H4>

          {/* event dropdown */}
          <ComponentWithLabel label="Choose your event">
            <Dropdown options={dummyEvents} placeholder="Select event" />
          </ComponentWithLabel>

          {/* ticket search */}
          <ComponentWithLabel label="Choose the ticket to sell">
            <TicketSearchComponent
              selectedTickets={selectedTickets}
              setSelectedTickets={setSelectedTickets}
            />
          </ComponentWithLabel>

          {/* suggested ticket */}
          <ComponentWithLabel label="Suggested ticket:">
            <TicketCardComponent {...{ ...dummyTickets[0], status: "grey" }} />
          </ComponentWithLabel>
        </div>

        {/*  */}
        <div className="flex w-full flex-col gap-[16px]">
          <H4 className="text-simpleGray700">How we secure your sales</H4>
          <ul className="list-decimal">
            <PSmall className="text-simpleGray700">
              <List items={HowToSecureYourSales} parentClassName="text-simpleGray700" />
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
          {/* selected tickets */}
          <ComponentWithLabel label="Your selected tickets:">
            <div className="flex flex-wrap gap-[8px]">
              {selectedTickets.length ? (
                selectedTickets.map((ticket) => (
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
                ))
              ) : (
                <PSmall className="font-bold text-simpleGray700">
                  No ticket(s) selected
                </PSmall>
              )}
            </div>
          </ComponentWithLabel>
        </div>
        <div className="col-span-2 flex w-full items-center justify-center">
          <Button>set price</Button>
        </div>
      </div>
    </Container>
  );
}
