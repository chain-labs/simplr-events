"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiLinkDuotone, PiQuestion } from "react-icons/pi";
import { z } from "zod";

import {
  LinkingTicketFormData,
  linktingTicketFormSchema,
} from "@/app/link-your-ticket/page";
import { dummyTickets } from "@/utils/dummyData";

import { Button } from "../ui/button";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkingTicketFormData>({
    resolver: zodResolver(linktingTicketFormSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleLinkingTicketSubmit)}
      className="m-auto flex max-w-[780px] gap-[64px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]"
    >
      <div className="flex w-full flex-col gap-[16px]">
        {/* @ts-expect-error */}
        <PiLinkDuotone className="text-[48px] text-simpleBlue" />
        <H4>Link your ticket</H4>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Choose your event
          <EventSearchComponent register={register("event")} />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Enter your Order ID
          <Input
            placeholder="OD123456789"
            icon={
              <TitleTag title="Order ID" position="bottom">
                {/* @ts-expect-error */}
                <PiQuestion />
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
                e.currentTarget.setCustomValidity(errors.orderId.message || "");
              }
            }}
            required
          />
        </label>
        <label className="flex flex-col gap-[8px] text-[14px] font-medium leading-[20px] text-simpleGray500">
          Enter your seat number
          <Input
            placeholder="Seat A123"
            icon={
              <TitleTag title="Seat Number" position="bottom">
                {/* @ts-expect-error */}
                <PiQuestion />
              </TitleTag>
            }
            iconPosition="right"
            {...register("seatNumber", {
              onChange: (e) => {
                e.target.setCustomValidity("");
              },
            })}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
              if (errors.seatNumber) {
                e.currentTarget.setCustomValidity(
                  errors.seatNumber.message || ""
                );
              } else {
                e.currentTarget.setCustomValidity("");
              }
            }}
            required
          />
          <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
            This is a hint text to help user.
          </p>
        </label>
      </div>
      <div className="flex w-fit max-w-[300px] flex-col gap-[16px]">
        <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
          Suggested Events
        </p>
        {suggestedEvents.map((event) => (
          <EventCardComponent key={event.id} {...event} status="grey" />
        ))}
        <Button variant="primary" type="submit">
          confirm ticket ↗️
        </Button>
        <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
          You will be taken to the event's portal, where you will be required to
          log in and confirm your booking.
        </p>
      </div>
    </form>
  );
}
