"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { PiMoneyDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { dummyTickets } from "@/utils/dummyData";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { Input } from "../ui/input";
import { PSmall } from "../ui/paragraph";
import TicketCardComponent from "./ticket-card-component";
import TicketSearchComponent from "./ticket-search-component";

type SettingTicketPricingProps = {
  setSelectedTickets: Dispatch<SetStateAction<Ticket[]>>;
  selectedTickets: Ticket[];
};

export default function SettingTicketPricing({
  setSelectedTickets,
  selectedTickets,
}: SettingTicketPricingProps) {
  const dummyEvents = dummyTickets.map((ticket) => ticket.eventName);
  const [settingPriceForAllTickets, setSettingPriceForAllTickets] = useState<{
    price: number;
    auto: boolean;
  }>({ price: 0, auto: false });
  const [settingPriceForSelectedTickets, setSettingPriceForSelectedTickets] =
    useState<{
      [key: string]: number;
    }>({});
  return (
    <Container className="my-[50px] max-w-[1000px]">
      <div className="grid grid-cols-[auto_auto] gap-[64px]">
        <div className="flex w-[320px] flex-col gap-[16px]">
          <H4 className="text-simpleGray700">Confirm selling details</H4>

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

          {/* Multiple tickets price setter */}
          {selectedTickets.length > 1 && (
            <ComponentWithLabel label="Set price for all tickets">
              <Input
                type="number"
                placeholder={
                  settingPriceForAllTickets.auto ? "Auto" : "Enter price"
                }
                icon={
                  // @ts-expect-error
                  <PiMoneyDuotone className="text-simpleGray500" />
                }
                iconPosition="left"
                value={
                  settingPriceForAllTickets.auto
                    ? "Auto"
                    : settingPriceForAllTickets.price
                }
                onChange={(e) =>
                  setSettingPriceForAllTickets((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                    auto: false,
                  }))
                }
                min={1}
              />
            </ComponentWithLabel>
          )}
        </div>
        <div className="flex w-full flex-col gap-[16px]">
          {/* selected tickets */}
          <ComponentWithLabel label="Your selected tickets:">
            <div
              className={cn(
                "grid grid-cols-2 gap-4",
                selectedTickets.length === 1 && "grid-cols-1"
              )}
            >
              {selectedTickets.length ? (
                selectedTickets.map((ticket) => (
                  <>
                    {/* Ticket */}
                    <TicketCardComponent
                      key={ticket.id}
                      status="closable"
                      onClose={() =>
                        setSelectedTickets((prev) =>
                          prev.filter(
                            (prevTicket) => prevTicket.id !== ticket.id
                          )
                        )
                      }
                      {...ticket}
                    />
                    {/* Price */}
                    <Input
                      type="number"
                      placeholder="Enter price"
                      icon={
                        // @ts-expect-error
                        <PiMoneyDuotone className="text-simpleGray500" />
                      }
                      value={
                        settingPriceForAllTickets.auto
                          ? settingPriceForSelectedTickets[ticket.id]
                          : settingPriceForAllTickets.price
                      }
                      onChange={(e) => {
                        setSettingPriceForSelectedTickets((prev) => ({
                          ...prev,
                          [ticket.id]: Number(e.target.value),
                        }));
                        setSettingPriceForAllTickets((prev) => ({
                          ...prev,
                          auto: true,
                        }));
                      }}
                      valid={
                        settingPriceForAllTickets.auto
                          ? !!settingPriceForSelectedTickets[ticket.id]
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
                <Button className="mx-auto" disabled={!selectedTickets.length}>
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
          >
            {selectedTickets.length > 1 ? "confirm" : "select"}
          </Button>
        )}
      </div>
    </Container>
  );
}
