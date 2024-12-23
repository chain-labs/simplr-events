"use client";

import { PiCheck } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { PSmall } from "../ui/paragraph";

type EventCardComponentProps = Ticket & {
  status: "selected" | "grey" | "white" | "grey selected";
  onClick?: () => void;
};
export default function EventCardComponent({
  EventIcon,
  eventName,
  startDate,
  location,
  status,
  onClick,
}: EventCardComponentProps) {
  return (
    <div
      key={eventName}
      className={cn(
        "flex gap-[4px] rounded-[16px] p-[16px] text-simpleGray900",
        status === "white" && "bg-simpleWhite",
        status === "grey" && "bg-simpleGray200",
        status === "selected" && "bg-simpleBlue text-simpleWhite",
        status === "grey selected" && "bg-simpleGray200"
      )}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-[4px]">
        {/* @ts-expect-error */}
        <EventIcon size={32} className={cn("text-[32px]")} />
        <div className="flex flex-col">
          <p className="text-[20px] font-bold leading-[30px] text-[inherit]">
            {eventName}
          </p>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {startDate}
          </PSmall>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {location}
          </PSmall>
        </div>
      </div>
      {status === "selected" && (
        //@ts-expect-error
        <PiCheck className="text-[20px] text-simpleWhite" />
      )}
      {status === "grey selected" && (
        // @ts-expect-error
        <PiCheck className="text-[20px] text-simpleBlue" />
      )}
    </div>
  );
}
