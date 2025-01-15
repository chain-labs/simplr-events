"use client";

import { useState } from "react";

import TicketDetail from "@/components/buy-ticket/ticket-detail";
import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";

export default function BuyTicket() {
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];
  const [state, setState] = useState<"detail">("detail");
  return (
    <>
      {state === "detail" && <TicketDetail />}
      <FooterProgressBar STEPS={footerSteps} active="Start selling your ticket" />
    </>
  );
}
