"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiLinkDuotone, PiQuestion } from "react-icons/pi";
import { z } from "zod";

import {
  LinkingTicketFormData,
  linktingTicketFormSchema,
} from "@/app/link-your-ticket/page";
import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";

import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import { H4 } from "../ui/heading";
import { Input } from "../ui/input";
import TitleTag from "../ui/title-tag";
import EventCardComponent from "./event-card-component";
import EventSearchComponent from "./event-search-component";

export default function LinkingTicketContainer({
  handleLinkingTicketSubmit,
}: {
  handleLinkingTicketSubmit: (data: LinkingTicketFormData) => void;
}) {
  // TODO: Replace dummyTickets with real data
  const suggestedEvents = dummyTickets.slice(0, 2);

  const seatType = [
    {
      value: "student",
      label: "Student",
    },
    {
      value: "employed",
      label: "Employed",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LinkingTicketFormData>({
    resolver: zodResolver(linktingTicketFormSchema),
  });

  const handleSuggestedEventClick = (ticketDetails?: Ticket) => {
    if (ticketDetails) {
      const { eventName, orderId, seat } = ticketDetails;
      setValue("event", eventName);
      setValue("orderId", orderId);
      setValue("seatNumber", seat);
    }
  };

  return (
    <Container className="my-[16px] md:my-0 max-w-[780px]">
      <form
        onSubmit={handleSubmit(handleLinkingTicketSubmit)}
        className="flex w-full flex-col gap-[32px] md:flex-row md:gap-[64px]"
      >
        <div className="flex w-full flex-col gap-[16px]">
          {/* @ts-expect-error */}
          <PiLinkDuotone className="text-[48px] text-simpleBlue" />
          <H4 className="text-simpleGray700">Link your ticket</H4>

          {/* search event */}
          <ComponentWithLabel
            label="Choose your event"
            className="text-simpleGray700"
          >
            <EventSearchComponent register={register("event")} />
          </ComponentWithLabel>

          {/* order id */}
          <ComponentWithLabel
            label="Enter your Order ID"
            className="text-simpleGray700"
          >
            <Input
              placeholder="OD123456789"
              icon={
                <TitleTag title="Order ID" position="bottom">
                  {/* @ts-expect-error */}
                  <PiQuestion className="text-simpleGray400" />
                </TitleTag>
              }
              iconPosition="right"
              {...register("orderId", {
                onChange: (e) => {
                  e.target.setCustomValidity("");
                },
              })}
              onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                if (errors.orderId) {
                  e.currentTarget.setCustomValidity(
                    errors.orderId.message || ""
                  );
                }
              }}
              required
            />
          </ComponentWithLabel>

          {/* seat number */}
          <ComponentWithLabel
            label="Enter your seat number"
            className="text-simpleGray700"
          >
            <Input
              placeholder="Seat A123"
              icon={
                <TitleTag title="Seat Number" position="bottom">
                  {/* @ts-expect-error */}
                  <PiQuestion className="text-simpleGray400" />
                </TitleTag>
              }
              iconPosition="right"
              {...register("seatNumber")}
            />
            <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
              This is a hint text to help user.
            </p>
          </ComponentWithLabel>

          {/* seat type */}
          <ComponentWithLabel
            label="or, choose your seat type"
            className="text-simpleGray700"
          >
            <Dropdown
              options={seatType}
              placeholder="Seat Type"
              openingDirection="up"
              Icon={
                <TitleTag title="Seat Number" position="bottom">
                  {/* @ts-expect-error */}
                  <PiQuestion className="text-simpleGray400" />
                </TitleTag>
              }
              register={register("seatType")}
            />
            <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
              This is a hint text to help user.
            </p>
          </ComponentWithLabel>
        </div>
        <div className="flex w-full flex-col gap-[16px] md:w-fit md:max-w-[300px]">
          <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
            Suggested Events
          </p>
          {suggestedEvents.map((event) => (
            <EventCardComponent
              key={event.id}
              status={
                event.eventName === watch("event") &&
                event.orderId === watch("orderId") &&
                event.seat === watch("seatNumber")
                  ? "selected"
                  : "grey"
              }
              {...event}
              onClick={handleSuggestedEventClick}
            />
          ))}
          <Button variant="primary" type="submit">
            confirm ticket ↗️
          </Button>
          <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
            You will be taken to the event's portal, where you will be required
            to log in and confirm your booking.
          </p>
        </div>
      </form>
    </Container>
  );
}
