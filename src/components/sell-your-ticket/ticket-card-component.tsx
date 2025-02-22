"use client";

import {
  PiCheck,
  PiInfoDuotone,
  PiShootingStarDuotone,
  PiXCircleDuotone,
} from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";

type EventCardComponentProps = {
  ticketData: Ticket;
  status: "selected" | "grey" | "white" | "grey selected" | "closable";
  onClick?: () => void;
  onClose?: () => void;
  parentClassName?: string;
};

export default function TicketCardComponent({
  ticketData,
  status,
  onClick,
  onClose,
  parentClassName,
}: EventCardComponentProps) {
  return (
    <div
      key={ticketData._id}
      className={cn(
        "grid grid-flow-col gap-[4px] rounded-[16px] p-[16px] text-simpleGray700",
        status === "white" && "bg-simpleWhite",
        status === "grey" && "bg-simpleGray200",
        status === "selected" && "bg-simpleBlue text-simpleWhite",
        status === "grey selected" && "bg-simpleGray200",
        status === "closable" && "bg-simpleBlue text-simpleWhite",
        parentClassName
      )}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-[4px]">
        <div className="flex flex-col gap-[8px]">
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            <PiShootingStarDuotone size={32} className={cn("text-[32px]")} />
            {ticketData.event.eventName}
          </p>
          <p
            className={cn(
              "text-[20px] font-bold leading-[28px] text-[inherit]",
              status === "selected" || status === "closable"
                ? "text-simpleWhite"
                : "text-simpleGray900"
            )}
          >
            Seat {ticketData.seat}
          </p>
          {/* <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {ticketData.orderNumber}
          </p> */}
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            {ticketData.event.startDateTime}
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            to {ticketData.event.endDateTime}
          </p>
          <p className="font-regular flex items-center gap-[1ch] text-[16px] leading-[24px] text-[inherit]">
            <PiInfoDuotone /> Additional Info
          </p>
        </div>
      </div>
      {status === "selected" && (
        <PiCheck className="ml-auto text-[20px] text-simpleWhite" />
      )}
      {status === "grey selected" && (
        <PiCheck className="ml-auto text-[20px] text-simpleBlue" />
      )}
      {status === "closable" && (
        <PiXCircleDuotone
          size={24}
          className="ml-auto h-[24px] w-[24px] cursor-pointer text-[24px] text-simpleWhite"
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) {
              onClose();
            }
          }}
        />
      )}
    </div>
  );
}
