"use client";

import { useState } from "react";

import { z } from "zod";

import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import useLinkTicket from "@/components/link-your-ticket/hooks/useLinkTicket";
import LinkedAndVerifiedTicket from "@/components/link-your-ticket/linked-and-verified-ticket";
import LinkingTicketContainer from "@/components/link-your-ticket/linking-ticket-container";
import OrderDetails from "@/components/link-your-ticket/order-details";
import { Order } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { dummyTickets } from "@/utils/dummyData";

// Define the schema using zod
export const linktingTicketFormSchema = z.object({
  event: z.string().nonempty("Event is required"),
  orderId: z.string().nonempty("Order ID is required"),
  seatNumber: z.string().nonempty("Seat number is required"),
});

export type LinkingTicketFormData = z.infer<typeof linktingTicketFormSchema>;

type centralizeStateData = {
  event: string;
  orderId: string;
  seatNumber: string;
  order: Order;
};

const emptyState: centralizeStateData = {
  event: "",
  orderId: "",
  seatNumber: "",
  order: {
    orderId: "",
    tickets: [],
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventName: "",
    other: "",
  },
};

export default function LinkYourTicket() {
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const [state, setState] = useState<
    "linking-ticket" | "order-details" | "link-and-verify-ticket"
  >("linking-ticket");

  const [centralizeState, setCentralizeState] =
    useState<centralizeStateData>(emptyState);

  const handleLinkingTicketSubmit = (data: LinkingTicketFormData) => {
    // TODO: Replace dummyTickets with real data
    const fetchingOrderData = dummyTickets.splice(0, 2);

    setCentralizeState((prev) => ({
      ...prev,
      ...data,
      order: {
        ...prev.order,
        // TODO: Replace dummyTickets with real data
        ...fetchingOrderData[0],
        tickets: fetchingOrderData,
      },
    }));

    setState("order-details");
  };

  const navigation = (() => {
    let currentState:
      | "linking-ticket"
      | "order-details"
      | "link-and-verify-ticket" = "linking-ticket";

    const next = () => {
      if (currentState === "linking-ticket") {
        currentState = "order-details";
      } else if (currentState === "order-details") {
        currentState = "link-and-verify-ticket";
      }
      setState(currentState);
    };

    const back = () => {
      if (currentState === "order-details") {
        currentState = "linking-ticket";
      } else if (currentState === "link-and-verify-ticket") {
        currentState = "order-details";
      }
      setState(currentState);
    };

    return { next, back };
  })();


  return (
    <>
      <div
        className={cn(
          state === "linking-ticket" ? "" : "hidden",
          "h-full w-full flex-grow"
        )}
      >
        <LinkingTicketContainer
          handleLinkingTicketSubmit={handleLinkingTicketSubmit}
        />
      </div>
      {state === "order-details" && (
        <OrderDetails navigation={navigation} data={centralizeState.order} />
      )}
      {state === "link-and-verify-ticket" && <LinkedAndVerifiedTicket />}
      <FooterProgressBar STEPS={footerSteps} />
    </>
  );
}
