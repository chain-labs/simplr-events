"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { PiSealWarningDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";
import { useDataFilter } from "@/utils/useDataFilter";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import EventCardComponent from "../link-your-ticket/event-card-component";
import SearchWithComponent from "../search-with-component";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { List } from "../ui/list";
import { PSmall } from "../ui/paragraph";
import TicketCardComponent from "./ticket-card-component";

type SellingLinkedTicketProps = {
  setSelectedTickets: Dispatch<SetStateAction<Ticket[]>>;
  selectedTickets: Ticket[];
  nextStep: () => void;
};

export default function SellingLinkedTicket({
  setSelectedTickets,
  selectedTickets,
  nextStep,
}: SellingLinkedTicketProps) {
  const dummyEvents = dummyTickets;
  const [selectedEvent, setSelectedEvent] = useState<Ticket>();
  const { filters, filteredData, setFilter, removeFilterElement } =
    useDataFilter(dummyTickets);

  useEffect(() => {
    if (selectedTickets.length) {
      removeFilterElement("id", selectedTickets[0].id);
    }
  }, [selectedTickets]);

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
    <Container className="max-w-[1000px] md:my-[50px]">
      <div className="grid grid-cols-1 gap-y-[32px] md:grid-cols-[auto_auto] md:gap-[64px]">
        <div className="col-span-1 flex w-full flex-col gap-[16px] md:col-auto md:w-[320px]">
          <H4 className="text-simpleGray700">Sell your ticket</H4>

          {/* event dropdown */}
          <ComponentWithLabel label="Choose your event">
            <SearchWithComponent
              data={filteredData}
              selectedItems={selectedEvent}
              setSelectedItems={setSelectedEvent}
              placeholder="Search for event"
              renderComponent={(item, isSelected, onClick) => (
                <TicketCardComponent
                  {...item}
                  status={isSelected ? "selected" : "grey"}
                  onClick={onClick}
                />
              )}
              getItemName={(item) => item.eventName}
            />
          </ComponentWithLabel>

          {/* ticket search */}
          <ComponentWithLabel label="Choose the ticket to sell">
            <SearchWithComponent
              selectedItems={selectedTickets}
              setSelectedItems={setSelectedTickets}
              data={filteredData.filter(
                (ticket) => ticket.eventName === selectedEvent?.eventName
              )}
              placeholder="Search for ticket"
              renderComponent={(item, isSelected, onClick) => (
                <TicketCardComponent
                  {...item}
                  status={isSelected ? "selected" : "grey"}
                  onClick={onClick}
                />
              )}
              filterFunction={(item, query) => {
                setFilter("seat", query);
                return item.seat.toLowerCase().includes(query.toLowerCase());
              }}
              getItemName={(item) => item.seat}
              disableInput={!selectedEvent}
              multiple
            />
          </ComponentWithLabel>

          {/* suggested ticket */}
          <ComponentWithLabel label="Suggested ticket:">
            <TicketCardComponent
              {...{ ...dummyTickets[0], status: "grey" }}
              onClick={() => {
                setSelectedTickets((prev) => {
                  if (
                    !prev.some((ticket) => ticket.id === dummyTickets[0].id)
                  ) {
                    return [...prev, dummyTickets[0]];
                  }
                  return prev;
                });
              }}
            />
          </ComponentWithLabel>
        </div>

        {/*  */}
        <div className="col-span-2 flex w-full flex-col gap-[16px] md:col-auto">
          <H4 className="text-simpleGray700">How we secure your sales</H4>
          <ul className="list-decimal">
            <PSmall className="text-simpleGray700">
              <List
                items={HowToSecureYourSales}
                parentClassName="text-simpleGray700"
              />
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
          <Button disabled={selectedTickets.length === 0} onClick={nextStep}>
            {selectedTickets.length === 0 ? "select a ticket" : "set price"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
