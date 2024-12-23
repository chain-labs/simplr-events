"use client";

import { dummyTickets } from "@/utils/dummyData";

import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { PSmall } from "../ui/paragraph";
import TicketCardComponent from "./ticket-card-component";
import TicketSearchComponent from "./ticket-search-component";

export default function SellingLinkedTicket() {
  const dummyEvents = dummyTickets.map((ticket) => ticket.eventName);
  return (
    <div className="m-auto flex max-w-[1000px] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <div className="flex w-full max-w-[320px] flex-col gap-[16px]">
        <H4>Sell your ticket</H4>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose your event
          <Dropdown options={dummyEvents} placeholder="Select event" />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose the tickets to sell
          <TicketSearchComponent />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Suggested ticket:
          <TicketCardComponent {...{ ...dummyTickets[0], status: "grey" }} />
        </label>
      </div>
      <div className="flex w-full flex-col gap-[16px]">
        <H4>How we secure your sales</H4>
        <ul className="list-decimal">
          <PSmall className="text-simpleGray700">
            <li>You list the ticket for sale today.</li>
            <li>
              When a Buyer decides to buy it, they make a payment—which is
              stored in our escrow.{" "}
            </li>
            <li>
              Buyer verifies the ticket and confirms that they've received it.
            </li>
            <li>
              If everything's okay and Buyer verifies & confirms the ticket: We
              transfer their payment to you.{" "}
            </li>
            <li>
              If Buyer refuses the ticket: We reverse their payment back to
              them. We notify you of the refusal of the ticket.
              <ol>
                <li className="list-alpha list-inside">
                  Please be warned that multiple violations in bad faith
                  (uploading expired/invalid tickets) could lead to a permanent
                  deactivation of your account.
                </li>
              </ol>
            </li>
          </PSmall>
        </ul>
      </div>
    </div>
  );
}
