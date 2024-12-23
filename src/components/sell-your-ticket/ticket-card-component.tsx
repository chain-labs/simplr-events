"use client";

import { PiCheck, PiInfoDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";

type EventCardComponentProps = Ticket & {
  status: "selected" | "grey" | "white" | "grey selected";
  onClick?: () => void;
};
export default function TicketCardComponent({
  EventIcon,
  ticketId,
  seat,
  orderId,
  eventName,
  startDate,
  endDate,
  startDay,
  endDay,
  status,
  onClick,
}: EventCardComponentProps) {
  return (
    <div
      key={ticketId}
      className={cn(
        "flex gap-[4px] rounded-[16px] p-[16px] text-simpleGray700",
        status === "white" && "bg-simpleWhite",
        status === "grey" && "bg-simpleGray200",
        status === "selected" && "bg-simpleBlue text-simpleWhite",
        status === "grey selected" && "bg-simpleGray200"
      )}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-[4px]">
        <div className="flex flex-col gap-[8px]">
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {/* @ts-expect-error */}

            <EventIcon size={21} className={cn("text-[21px]")} />
            {eventName}
          </p>
          <p
            className={cn(
              "text-[20px] font-bold leading-[28px] text-[inherit]",
              status === "selected" ? "text-simpleWhite" : "text-simpleGray900"
            )}
          >
            Seat {seat}
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {orderId}
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {startDate} | Day {startDay} to
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {endDate} | Day {endDay}
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {/* @ts-expect-error */}
            <PiInfoDuotone /> Additional Info
          </p>
        </div>
      </div>
      {status === "selected" && (
        // @ts-expect-error
        <PiCheck className="text-[20px] text-simpleWhite" />
      )}
      {status === "grey selected" && (
        // @ts-expect-error
        <PiCheck className="text-[20px] text-simpleBlue" />
      )}
    </div>
  );
}
