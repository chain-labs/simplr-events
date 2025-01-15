"use client";

import { useState } from "react";

import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import SellingLinkedTicket from "@/components/sell-your-ticket/selling-linked-ticket";
import SendTicketToBuyer from "@/components/sell-your-ticket/send-ticket-to-buyer";
import SettingTicketPricing from "@/components/sell-your-ticket/setting-ticket-pricing";
import TicketsOnSellMessage from "@/components/sell-your-ticket/tickets-on-sell-message";
import { Ticket } from "@/types/ticket";

export default function LinkYourTicket() {
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);

  const [state, setState] = useState<
    | "selling-linked-ticket"
    | "setting-ticket-pricing"
    | "tickets-on-sell-message"
    | "send-ticket-to-buyer"
  >("selling-linked-ticket");
  return (
    <>
      {state === "selling-linked-ticket" && (
        <SellingLinkedTicket
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
          nextStep={() => setState("setting-ticket-pricing")}
        />
      )}
      {state === "setting-ticket-pricing" && (
        <SettingTicketPricing
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
          nextStep={() => setState("tickets-on-sell-message")}
        />
      )}
      {state === "tickets-on-sell-message" && <TicketsOnSellMessage />}
      {state === "send-ticket-to-buyer" && <SendTicketToBuyer />}
      <FooterProgressBar STEPS={footerSteps} active="Start selling your ticket" />
    </>
  );
}
