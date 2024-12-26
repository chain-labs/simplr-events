"use client";

import { useState } from "react";

import TicketDetail from "@/components/buy-ticket/ticket-detail";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";

export default function BuyTicket() {
  const footerSteps: StepsType[] = [
    {
      name: "Your details",
      description: "Please provide your name and email",
      status: "completed",
    },
    {
      name: "Company details",
      description: "A few details about your company",
      status: "active",
    },
    {
      name: "Invite your team",
      description: "Start collaborating with your team",
      status: "pending",
    },
  ];
  const [state, setState] = useState<"detail">("detail");
  return (
    <>
      {state === "detail" && <TicketDetail />}
      <FooterProgressBar STEPS={footerSteps} />
    </>
  );
}
