"use client";

import { useEffect, useState } from "react";

import { z } from "zod";

import { Event } from "@/types/event";
import api from "@/utils/axios";
import { cn } from "@/utils/cn";

import FooterProgressBar, { StepsType } from "../footer-progress-bar";
import useTicketVerification from "./hooks/useTicketVerification";
import LinkedAndVerifiedTicket from "./linked-and-verified-ticket";
import LinkingTicketContainer from "./linking-ticket-container";
import OrderDetails from "./order-details";

// Define the schema using zod
export const linkingTicketFormSchema = z
  .object({
    event: z.string().nonempty("Event is required"),
    orderNumber: z.string().nonempty("Order ID is required"),
    seat: z.string().nonempty("Seat info required"),
  })
  .refine((data) => data.seat, {
    message: "Either seat number or seat type is required",
    path: ["seatNumber", "seatType"],
  });

export type LinkingTicketFormData = z.infer<typeof linkingTicketFormSchema>;

export type centralizedState = {
  event: string;
  seat: string;
  orderNumber: string;
  eventObj: Event;
  ticketData?: string;
};

const emptyState: centralizedState = {
  event: "",
  seat: "",
  orderNumber: "",
  eventObj: {} as Event,
  ticketData: "",
};

export default function LinkYourTicket() {
  const [eventsMaster, setEventsMaster] = useState<Event[]>([]);
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];

  const [pageState, setPageState] = useState<
    "linking-ticket" | "order-details" | "link-and-verify-ticket"
  >("linking-ticket");

  const [verificationTrigger, setVerificationTrigger] = useState(false);

  const [centralizeState, setCentralizeState] =
    useState<centralizedState>(emptyState);

  const { verifyTicketData } = useTicketVerification();

  const handleLinkingTicketSubmit = async (data: centralizedState) => {
    console.log({ data });
    // // Verification
    const ticketData = await verifyTicketData({
      seat: data.seat,
      orderNumber: data.orderNumber,
      eventObj: data.eventObj,
    });
    // // Update the state with the form data
    setCentralizeState((prev) => ({
      ...prev,
      ...data,
      ticketData: ticketData,
    }));
    setPageState("order-details");
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
      setPageState(currentState);
    };

    const back = () => {
      if (currentState === "order-details") {
        currentState = "linking-ticket";
      } else if (currentState === "link-and-verify-ticket") {
        currentState = "order-details";
      }
      setPageState(currentState);
    };

    return { next, back };
  })();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        setEventsMaster(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        className={cn(
          pageState === "linking-ticket" ? "flex" : "hidden",
          "h-full w-full flex-grow items-center justify-center"
        )}
      >
        <LinkingTicketContainer
          eventsMaster={eventsMaster}
          handleLinkingTicketSubmit={handleLinkingTicketSubmit}
        />
      </div>
      {pageState === "order-details" && (
        <OrderDetails
          navigation={navigation}
          data={centralizeState}
          setStates={setPageState}
        />
      )}
      {pageState === "link-and-verify-ticket" && <LinkedAndVerifiedTicket />}
      <FooterProgressBar
        STEPS={footerSteps}
        active={
          pageState === "linking-ticket"
            ? "Share your booking details"
            : pageState === "order-details"
              ? "Review your booking"
              : "Start selling your ticket"
        }
      />
    </>
  );
}
