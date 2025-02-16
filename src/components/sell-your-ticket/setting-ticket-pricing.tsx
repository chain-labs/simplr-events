"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { PiMoneyDuotone } from "react-icons/pi";
import { set } from "zod";

import { useTicketStore } from "@/app/sell-your-ticket/context";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { dummyTickets } from "@/utils/dummyData";

import { useUser } from "../../../UserContext";
import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import EventCardComponent from "../link-your-ticket/event-card-component";
import SearchWithComponent from "../search-with-component";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { Input } from "../ui/input";
import { PSmall } from "../ui/paragraph";
import TicketCardComponent from "./ticket-card-component";
import TicketSearchComponent from "./ticket-search-component";
import useListTicket from "./useListTicket";

type SettingTicketPricingProps = {
  nextStep: () => void;
};

export default function SettingTicketPricing({
  nextStep,
}: SettingTicketPricingProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [settingPriceForAllTickets, setSettingPriceForAllTickets] = useState<{
    price: number;
    auto: boolean;
  }>({ price: 0, auto: false });
  const [settingPriceForSelectedTickets, setSettingPriceForSelectedTickets] =
    useState<{
      [key: string]: number;
    }>({});

  const [listLoading, setListLoading] = useState(false);

  const { eventsList, selectedTickets, setSelectedTickets } = useTicketStore();

  const { approveTransfer, signTypedData, listTicket } = useListTicket();

  useEffect(() => {
    if (settingPriceForAllTickets) {
      if (
        !settingPriceForAllTickets.auto &&
        settingPriceForAllTickets.price !==
          settingPriceForSelectedTickets[selectedTickets[0]?._id]
      ) {
        const newTicketPrices: Record<string, number> = {};
        selectedTickets.forEach((ticket) => {
          newTicketPrices[ticket._id] = settingPriceForAllTickets.price;
        });
        setSettingPriceForSelectedTickets(newTicketPrices);
      }
    }
  }, [settingPriceForAllTickets]);

  const handleList = async () => {
    setListLoading(true);
    // Implement the logic to sell the selected tickets

    for (const ticket of selectedTickets) {
      await approveTransfer(ticket.event.contractAddress as `0x${string}`);
      const signature = await signTypedData({
        tokenId: ticket.tokenId,
        price: settingPriceForSelectedTickets[ticket._id]?.toString(),
        event: ticket.event,
      });
      await listTicket({
        price: settingPriceForSelectedTickets[ticket._id]?.toString(),
        ticket,
        signature,
      });
    }

    nextStep();

    console.log("Listed tickets");
  };

  return (
    <Container className="max-w-[1000px] md:my-[50px]">
      <div className="grid grid-cols-1 gap-[32px] md:grid-cols-[auto_auto] md:gap-[64px]">
        <div className="col-span-1 flex flex-col gap-[16px] md:col-auto md:w-[320px]">
          <H4 className="text-simpleGray700">Confirm selling details</H4>

          {/* event dropdown */}
          <ComponentWithLabel label="Choose your event">
            <SearchWithComponent<Event>
              placeholder="Search for event"
              data={eventsList}
              selectedItems={selectedEvent}
              setSelectedItems={
                setSelectedEvent as Dispatch<SetStateAction<Event | undefined>>
              }
              renderComponent={(item, isSelected, onClick) => (
                <EventCardComponent
                  event={item}
                  status={isSelected ? "selected" : "grey"}
                  onClick={onClick}
                />
              )}
              filterFunction={(item, query) =>
                item.eventName.toLowerCase().includes(query.toLowerCase())
              }
              getItemName={(item) => item.eventName}
            />
          </ComponentWithLabel>

          {/* ticket search */}
          <ComponentWithLabel label="Choose the ticket to sell">
            <SearchWithComponent<Ticket>
              selectedItems={selectedTickets}
              setSelectedItems={
                setSelectedTickets as Dispatch<SetStateAction<Ticket[]>>
              }
              data={selectedTickets.filter(
                (ticket) =>
                  ticket?.event?.eventName === selectedEvent?.eventName
              )}
              placeholder="Search for ticket"
              renderComponent={(item, isSelected, onClick) => (
                <TicketCardComponent
                  key={item._id}
                  ticketData={item}
                  status={isSelected ? "selected" : "grey"}
                  onClick={onClick}
                />
              )}
              filterFunction={(item, query) =>
                item.seat.toLowerCase().includes(query.toLowerCase())
              }
              getItemName={(item) => item.seat}
              multiple
            />
          </ComponentWithLabel>

          {/* Multiple tickets price setter */}
          {selectedTickets.length > 1 && (
            <ComponentWithLabel label="Set price for all tickets">
              <Input
                type="number"
                placeholder={
                  settingPriceForAllTickets.auto ? "Auto" : "Enter price"
                }
                icon={<PiMoneyDuotone className="text-simpleGray500" />}
                iconPosition="left"
                value={
                  settingPriceForAllTickets.auto
                    ? "Auto"
                    : settingPriceForAllTickets.price
                }
                onChange={(e) => {
                  setSettingPriceForAllTickets((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                    auto: false,
                  }));
                }}
                min={1}
              />
            </ComponentWithLabel>
          )}
        </div>
        <div className="col-span-2 flex w-full flex-col gap-[16px] md:col-auto">
          {/* selected tickets */}
          <ComponentWithLabel label="Your selected tickets:">
            <div
              className={cn(
                "grid gap-4 md:grid-cols-2",
                selectedTickets.length === 1 && "grid-cols-1"
              )}
            >
              {selectedTickets.length ? (
                selectedTickets.map((ticket) => (
                  <>
                    {/* Ticket */}
                    <TicketCardComponent
                      key={ticket._id}
                      ticketData={ticket}
                      status="closable"
                      onClose={() =>
                        setSelectedTickets((prev) =>
                          prev.filter(
                            (prevTicket) => prevTicket._id !== ticket._id
                          )
                        )
                      }
                      {...ticket}
                      parentClassName="w-fit md:w-full"
                    />
                    {/* Price */}
                    <Input
                      type="number"
                      placeholder="Enter price"
                      icon={<PiMoneyDuotone className="text-simpleGray500" />}
                      value={
                        settingPriceForAllTickets.auto
                          ? settingPriceForSelectedTickets[ticket._id]
                          : settingPriceForAllTickets.price
                      }
                      onChange={(e) => {
                        setSettingPriceForSelectedTickets((prev) => ({
                          ...prev,
                          [ticket._id]: Number(e.target.value),
                        }));
                        setSettingPriceForAllTickets((prev) => ({
                          ...prev,
                          auto: true,
                        }));
                      }}
                      valid={
                        settingPriceForAllTickets.auto
                          ? !!settingPriceForSelectedTickets[ticket._id]
                          : !!settingPriceForAllTickets.price
                      }
                      iconPosition="left"
                      parentClassName="my-auto"
                      min={1}
                    />
                  </>
                ))
              ) : (
                <PSmall className="font-bold text-simpleGray700">
                  No ticket(s) selected
                </PSmall>
              )}
              {selectedTickets.length === 1 && (
                <Button
                  className="mx-auto"
                  disabled={
                    !selectedTickets.length ||
                    !Number(
                      settingPriceForSelectedTickets[selectedTickets[0]._id]
                    )
                  }
                  isLoading={listLoading}
                  onClick={handleList}
                >
                  sell ticket
                </Button>
              )}
            </div>
          </ComponentWithLabel>
        </div>
        {selectedTickets.length > 1 && (
          <Button
            className="col-span-2 ml-auto"
            disabled={!selectedTickets.length}
            onClick={handleList}
            isLoading={listLoading}
          >
            {selectedTickets.length > 1 ? "confirm" : "select"}
          </Button>
        )}
      </div>
    </Container>
  );
}
