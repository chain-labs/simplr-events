"use client";

import { Order } from "@/types/ticket";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PLarge, PMedium, PSmall } from "../ui/paragraph";

export default function OrderDetails({
  data,
  navigation,
}: {
  data: Order;
  navigation: {
    next: () => void;
    back: () => void;
  };
}) {
  return (
    <Container className="max-w-[780px]">
      <div className="flex gap-[64px]">
        <div className="flex w-full flex-col gap-[16px]">
          <H4 className="text-simpleGray700">Your order details</H4>

          {/* order id  */}
          <ComponentWithLabel label="Order ID" gap={4}>
            <PLarge>{data.orderId}</PLarge>
          </ComponentWithLabel>

          {/* tickets */}
          <div className="flex gap-[8px]">
            {data.tickets.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-simpleGray200 p-[8px]"
              >
                <ComponentWithLabel
                  label={`Ticket #${ticket.ticketId}`}
                  gap={4}
                >
                  <PMedium className="font-bold">Seat {ticket.seat}</PMedium>
                </ComponentWithLabel>
              </div>
            ))}
          </div>

          {/* start and end datetime */}
          <div className="flex gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              <ComponentWithLabel label="Start Date" gap={4}>
                <PSmall className="font-bold">
                  {data.startDate} | {data.startTime}
                </PSmall>
              </ComponentWithLabel>
            </div>

            <div className="flex flex-col gap-[4px]">
              <ComponentWithLabel label="End Date" gap={4}>
                <PSmall className="font-bold">
                  {data.endDate} | {data.endTime}
                </PSmall>
              </ComponentWithLabel>
            </div>
          </div>

          {/* another field */}
          <div className="flex flex-col gap-[4px]">
            <ComponentWithLabel label="Another Field" gap={4}>
              <PSmall className="font-bold">{data.other}</PSmall>
            </ComponentWithLabel>
          </div>
          <div className="flex w-full items-center justify-between">
            <Button variant="secondary" onClick={navigation.back}>
              {" "}
              go back{" "}
            </Button>
            <Button variant="primary" onClick={navigation.next}>
              {" "}
              confirm & link{" "}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
