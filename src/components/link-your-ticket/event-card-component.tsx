"use client";

import { PiCheck, PiShootingStarDuotone } from "react-icons/pi";

import { Event } from "@/types/event";
import { cn } from "@/utils/cn";

import { PSmall } from "../ui/paragraph";

type EventCardComponentProps = {
  status: "selected" | "grey" | "white" | "grey selected";
  onClick?: (event?: Event) => void;
  event: Event;
};
export default function EventCardComponent({
  status,
  onClick,
  event,
}: EventCardComponentProps) {
  return (
    <div
      key={event.eventName}
      className={cn(
        "flex w-full gap-[4px] rounded-[16px] p-[16px] text-simpleGray900",
        status === "white" && "bg-simpleWhite",
        status === "grey" && "bg-simpleGray200",
        status === "selected" && "bg-simpleBlue text-simpleWhite",
        status === "grey selected" && "bg-simpleGray200"
      )}
      onClick={() => {
        if (onClick) {
          onClick(event);
        }
      }}
    >
      <div className="flex w-full flex-col gap-[4px]">
        <PiShootingStarDuotone size={32} className={cn("text-[32px]")} />
        <div className="flex flex-col">
          <p className="text-[20px] font-bold leading-[30px] text-[inherit]">
            {event.eventName}
          </p>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {`${event.startDateTime} - ${event.endDateTime}`}
          </PSmall>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {event.location}
          </PSmall>
        </div>
      </div>
      {status === "selected" && (
        <PiCheck className="text-[20px] text-simpleWhite" />
      )}
      {status === "grey selected" && (
        <PiCheck className="text-[20px] text-simpleBlue" />
      )}
    </div>
  );
}
