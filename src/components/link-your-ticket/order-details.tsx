"use client";

import { dummyTickets } from "@/utils/dummyData";

import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PLarge, PMedium, PSmall } from "../ui/paragraph";

export default function OrderDetails() {
  // TODO: Replace dummy data with real data
  const data = { ...dummyTickets[0], tickets: dummyTickets.slice(0, 2) };

  return (
    <div className="m-auto flex max-w-[780px] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-full flex-col gap-[16px]">
        <H4>Your order details</H4>
        <div className="flex flex-col gap-[4px]">
          <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
            Order ID
          </label>
          <PLarge>{data.orderId}</PLarge>
        </div>
        <div className="flex gap-[8px]">
          {data.tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-simpleGray200 p-[8px]"
            >
              <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
                Ticket ID #{ticket.ticketId}
              </label>
              <PMedium className="font-bold">{ticket.seat}</PMedium>
            </div>
          ))}
        </div>
        <div className="flex gap-[32px]">
          <div className="flex flex-col gap-[4px]">
            <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
              Start Date
            </label>
            <PSmall className="font-bold">
              {data.startDate} | {data.startTime}
            </PSmall>
          </div>

          <div className="flex flex-col gap-[4px]">
            <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
              End Date
            </label>
            <PSmall className="font-bold">
              {data.endDate} | {data.endTime}
            </PSmall>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
            Another Field
          </label>
          <PSmall className="font-bold">{data.other}</PSmall>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button variant="secondary"> go back </Button>
          <Button variant="primary"> confirm & link </Button>
        </div>
      </div>
    </div>
  );
}
