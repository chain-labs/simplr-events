"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { PiMoneyDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";

import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { Input } from "../ui/input";
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
    <div className="m-auto grid max-w-[1000px] grid-cols-[auto_auto] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-[320px] flex-col gap-[16px]">
        <H4>Confirm selling details</H4>
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
          Set price for all tickets
          <Input
            type="number"
            placeholder="Enter price"
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
            min={0}
          />
        </label>
      </div>
      <div className="flex w-full flex-col gap-[16px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Your selected tickets:
        </label>
        <div className="grid grid-cols-2 gap-4">
          {selectedTickets.map((ticket) => (
            <>
              <TicketCardComponent
                key={ticket.id}
                status="closable"
                onClose={() =>
                  setSelectedTickets((prev) =>
                    prev.filter((prevTicket) => prevTicket.id !== ticket.id)
                  )
                }
                {...ticket}
              />
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
                min={0}
              />
            </>
          ))}
        </div>
      </div>
      <Button className="mt- col-span-2 ml-auto">confirm</Button>
    </div>
  );
}
