"use client";

import { useState } from "react";

import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import SellingLinkedTicket from "@/components/sell-your-ticket/selling-linked-ticket";
import SettingTicketPricing from "@/components/sell-your-ticket/setting-ticket-pricing";
import { Ticket } from "@/types/ticket";

export default function LinkYourTicket() {
  const footerSteps: StepsType[] = [
    {
      name: "Your details",
      status: "completed",
      description: "Please provide your name and email",
    },
    {
      name: "Company details",
      status: "active",
      description: "A few details about your company",
    },
    {
      name: "Invite your team",
      status: "pending",
      description: "Start collaborating with your team",
    },
  ];

  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);

  const [state, setState] = useState<
    "selling-linked-ticket" | "setting-ticket-pricing"
  >("setting-ticket-pricing");
  return (
    <>
      {state === "selling-linked-ticket" && (
        <SellingLinkedTicket
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
        />
      )}
      {state === "setting-ticket-pricing" && (
        <SettingTicketPricing
          selectedTickets={selectedTickets}
          setSelectedTickets={setSelectedTickets}
        />
      )}
      <FooterProgressBar STEPS={footerSteps} />
    </>
  );
}
