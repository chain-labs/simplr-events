"use client";

import {
  PiLinkDuotone,
  PiMagnifyingGlass,
  PiQuestion,
  PiShootingStarDuotone,
} from "react-icons/pi";

import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { Input } from "../ui/input";
import { PSmall } from "../ui/paragraph";
import EventSearchComponent from "./event-search-component";
import EventCardComponent from "./event-card-component";

export default function LinkingTicketContainer() {
  const suggestedEvents = [
    {
      icon: PiShootingStarDuotone,
      name: "DevCon 2024",
      date: "Sep 23, 2024",
      location: "Bangalore, India",
    },
    {
      icon: PiShootingStarDuotone,
      name: "Taipei 2024",
      date: "Sep 23, 2024",
      location: "Bangalore, India",
    },
  ];
  return (
    <div className="m-auto flex max-w-[780px] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-full flex-col gap-[16px]">
        {/* @ts-expect-error - PiLinkDuotone is a valid icon component */}
        <PiLinkDuotone className="text-[48px] text-simpleBlue" />
        <H4>Link your ticket</H4>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose your event
          <EventSearchComponent />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Enter your Order ID
          <Input
            placeholder="OD123456789"
            icon={
              //@ts-except-error - PiQuestion is a valid icon component
              <PiQuestion />
            }
            iconPosition="right"
          />
          <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
            This is a hint text to help user.
          </p>
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Enter your seat number
          <Input
            placeholder="Seat A123"
            icon={
              //@ts-except-error - PiMagnifyingGlass is a valid icon component
              <PiQuestion />
            }
            iconPosition="right"
          />
          <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
            This is a hint text to help user.
          </p>
        </label>
      </div>
      <div className="flex w-fit max-w-[300px] flex-col gap-[16px]">
        <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
          Suggested Events
        </p>
        {suggestedEvents.map((event) => (
          <EventCardComponent
            key={event.name}
            Icon={event.icon}
            name={event.name}
            date={event.date}
            location={event.location}
            status="grey"
          />
        ))}
        <Button variant="primary"> confirm ticket ↗️</Button>
        <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
          You will be taken to the event's portal, where you will be required to
          log in and confirm your booking.
        </p>
      </div>
    </div>
  );
}
