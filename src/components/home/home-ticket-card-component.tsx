import Link from "next/link";

import {
  PiCalendarDotDuotone,
  PiCalendarDotsDuotone,
  PiInfoDuotone,
  PiMoneyWavyDuotone,
} from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { LabelSmall } from "../ui/label";

type HomeTicketCardComponentProps = {
  ticket: Ticket;
  bgGradient?: "yellow" | "pink";
};

export default function HomeTicketCardComponent({
  ticket,
  bgGradient,
}: HomeTicketCardComponentProps) {
  return (
    <div
      key={ticket.ticketId}
      className="grid-flex-row relative z-0 grid w-fit min-w-fit gap-[16px] overflow-hidden rounded-[16px] bg-simpleWhite p-[16px]"
    >
      {/* bg gradient */}
      <div
        className={cn(
          "absolute bottom-0 left-0 z-[-1] h-[20%] w-full bg-gradient-to-b",
          bgGradient === "yellow" && "from-[#F2FF4900] to-[#F2FF4980]",
          bgGradient === "pink" && "from-[#FB62F600] to-[#FB62F680]"
        )}
      ></div>

      {/* event, seat and ticketid */}
      <div className="flex items-center gap-[4px] text-[16px] leading-[24px] text-simpleGray700">
        {/* @ts-expect-error */}
        <ticket.EventIcon className="text-[24px]" />
        {ticket.eventName}
      </div>
      <div className="flex flex-col">
        <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
          {ticket.seat}
        </p>
        <p className="flex gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
          {ticket.orderId}
        </p>
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* start and end date */}
      <div className="grid grid-flow-col items-center gap-[16px]">
        <div className="flex flex-col gap-[4px] whitespace-nowrap">
          <LabelSmall className="text-simpleGray700">
            {/* @ts-expect-error */}
            <PiCalendarDotDuotone />
            Start Date
          </LabelSmall>

          <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
            {ticket.startDate} | Day {ticket.startDay}
          </p>
        </div>
        <div className="h-full w-[1px] bg-simpleGray400" />
        <div className="flex flex-col gap-[4px] whitespace-nowrap">
          <LabelSmall className="text-simpleGray700">
            {/* @ts-expect-error */}
            <PiCalendarDotsDuotone />
            End Date
          </LabelSmall>
          <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
            {ticket.endDate} | Day {ticket.endDay}
          </p>
        </div>
      </div>

      {/* additional info */}
      <div className="flex flex-col gap-[4px]">
        <LabelSmall className="text-simpleGray700">
          {/* @ts-expect-error */}
          <PiInfoDuotone />
          Additional Feild
        </LabelSmall>
        <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
          {ticket.other}
        </p>
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* price */}
      <div className="flex flex-col items-start justify-start gap-[4px]">
        <LabelSmall className="text-simpleGray700">
          {/* @ts-expect-error */}
          <PiMoneyWavyDuotone />
          Price
        </LabelSmall>
        <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
          {ticket.price}
        </p>
      </div>

      {/* link which lead to viewing ticket  */}
      <Link href={`/buy/${ticket.ticketId}`}>
        <Button variant="primary-blue" size="sm">
          view ticket
        </Button>
      </Link>
    </div>
  );
}
