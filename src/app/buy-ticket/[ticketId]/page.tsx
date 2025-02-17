"use client";

import { use, useEffect, useState } from "react";

import axios from "axios";

import {
  Confirmation,
  Details,
  Dispute,
  DisputeConfirmation,
  Success,
  TicketDetails,
} from "@/components/buy-ticket/ticket-detail";
import Container from "@/components/component/container";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import {
  TICKET_RESPONSE_TYPE,
  USER_TICKET_QUERY,
} from "@/gql/queries/user-tickets.query";
import { cn } from "@/utils/cn";
import { envVars } from "@/utils/envVars";

export default function BuyTicket({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.ticketId;
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const [ticket, setTicket] = useState({
    price: "$500.00",
    orderId: "OD123456789",
    seat: "2B",
    startDate: "Oct 14, 2024 | 11AM ET",
    endDate: "Oct 24, 2024 | 12PM ET",
    other: "Field Detail Info",
  });

  useEffect(() => {
    const getTicketDetails = async () => {
      const response = await axios.post(envVars.subgraphUrl, {
        query: USER_TICKET_QUERY,
        variables: { ticketId: ticketId },
      });
      const ticketsData = response.data as TICKET_RESPONSE_TYPE;
      console.log('ticketsData', ticketsData);
      setTicket({
        price: ticketsData.ticket.listings.items[0].price,
        orderId: ticketId.split("-").reverse()[0],
        seat: ticketsData.ticket.seat,
        startDate: ticketsData.ticket.event.eventDate,
        endDate: ticketsData.ticket.event.eventDate,
        other: "Field Detail Info",
      });
    };

    if (typeof ticketId === "string") {
      getTicketDetails();
    }
  }, [params]);

  console.log("ticket", ticket);

  const [state, setState] = useState<
    | "details"
    | "confirmation"
    | "success"
    | "dispute"
    | "dispute-confirmation"
    | "sold-out"
  >("details");
  return (
    <>
      <Container className="my-[16px] max-w-[1000px] md:my-[50px]">
        <div
          className={cn("flex flex-col gap-[32px] md:flex-row md:gap-[64px]")}
        >
          <TicketDetails
            ticket={ticket}
            state={state}
            parentClassName={cn(
              "flex md:hidden",
              state === "confirmation" && "hidden"
            )}
          />
          {state === "details" && <Details />}
          {state === "confirmation" && <Confirmation />}
          {state === "success" && <Success />}
          {state === "dispute" && <Dispute />}
          {state === "dispute-confirmation" && <DisputeConfirmation />}
          <TicketDetails
            ticket={ticket}
            state={state}
            parentClassName={cn(
              "hidden md:flex",
              state === "confirmation" && "flex"
            )}
          />
        </div>
      </Container>
      <FooterProgressBar
        STEPS={footerSteps}
        active="Start selling your ticket"
      />
    </>
  );
}
