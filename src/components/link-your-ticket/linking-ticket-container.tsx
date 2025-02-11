"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiLinkDuotone, PiQuestion } from "react-icons/pi";
import { z } from "zod";

import { Event } from "@/types/event";

import {
  LinkingTicketFormData,
  centralizedState,
  linkingTicketFormSchema,
} from ".";
import If from "../If";
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
  eventsMaster,
}: {
  handleLinkingTicketSubmit: (data: centralizedState) => void;
  eventsMaster: Event[];
}) {
  const suggestedEvents =
    eventsMaster.length > 2
      ? eventsMaster.sort(() => 0.5 - Math.random()).slice(0, 2)
      : eventsMaster;

  const getEventFromId = (id: string) => {
    return eventsMaster.find((event) => event._id === id);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LinkingTicketFormData>({
    resolver: zodResolver(linkingTicketFormSchema),
    mode: "onSubmit", // Ensure validation is triggered on submit
  });

  const event = getEventFromId(watch("event"));
  const [isLoading, setIsLoading] = useState(false);

  const seatTypes = useMemo(() => {
    if (!event) return [];

    const seatOptions =
      event.seatOptions?.map((option) => ({ value: option, label: option })) ??
      [];

    return seatOptions;
  }, [event]);

  const handleEventClick = (eventDetails?: Event) => {
    if (eventDetails) {
      const { _id: id } = eventDetails;
      setValue("event", id);
    }
  };

  const onSubmit: SubmitHandler<LinkingTicketFormData> = (formData) => {
    console.log("Form submitted"); // Add this log
    if (!event) return;
    setIsLoading(true);
    const enrichedData = {
      ...formData,
      // Add custom fields to send here
      eventObj: event,
    };
    console.log({ event, formData, enrichedData });
    return handleLinkingTicketSubmit(enrichedData);
  };

  return (
    <Container className="my-[16px] max-w-[780px] md:my-0">
      <form
        className="flex w-full flex-col gap-[32px] md:flex-row md:gap-[64px]"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submit event triggered"); // Add this log
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className="flex w-full flex-col gap-[16px]">
          <PiLinkDuotone className="text-[48px] text-simpleBlue" />
          <H4 className="text-simpleGray700">Link your ticket</H4>

          {/* search event */}
          <ComponentWithLabel
            label="Choose your event"
            className="text-simpleGray700"
          >
            <EventSearchComponent
              externalSelectedEvent={event}
              handleEventClick={handleEventClick}
              eventsMaster={eventsMaster}
            />
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
                  <PiQuestion className="text-simpleGray400" />
                </TitleTag>
              }
              iconPosition="right"
              {...register("orderNumber", {
                onChange: (e) => {
                  e.target.setCustomValidity("");
                },
              })}
              onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                if (errors.orderNumber) {
                  e.currentTarget.setCustomValidity(
                    errors.orderNumber.message || ""
                  );
                }
              }}
              required
            />
          </ComponentWithLabel>

          <If
            condition={event?.seatInputType === "input"}
            then={
              <ComponentWithLabel
                label="Enter your seat number"
                className="text-simpleGray700"
              >
                <Input
                  placeholder="Seat A123"
                  icon={
                    <TitleTag title="Seat Number" position="bottom">
                      <PiQuestion className="text-simpleGray400" />
                    </TitleTag>
                  }
                  iconPosition="right"
                  {...register("seat")}
                />
                {/* <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
                  This is a hint text to help user.
                </p> */}
              </ComponentWithLabel>
            }
          />

          <If
            condition={event?.seatInputType === "dropdown"}
            then={
              <ComponentWithLabel
                label="Choose your seat type"
                className="text-simpleGray700"
              >
                <Dropdown
                  options={seatTypes}
                  placeholder="Seat Type"
                  openingDirection="up"
                  Icon={
                    <TitleTag title="Seat Number" position="bottom">
                      <PiQuestion className="text-simpleGray400" />
                    </TitleTag>
                  }
                  register={register("seat")}
                />
                {/* <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
                  This is a hint text to help user.
                </p> */}
              </ComponentWithLabel>
            }
          />
        </div>

        <If
          condition={!event}
          then={
            // Suggested Event
            <div className="flex w-full flex-col gap-[16px] md:w-fit md:max-w-[300px]">
              <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
                Suggested Events
              </p>
              {suggestedEvents.map((event) => (
                <EventCardComponent
                  key={event._id}
                  status={
                    event.eventName === watch("event") ? "selected" : "grey"
                  }
                  {...event}
                  onClick={handleEventClick}
                  event={event}
                />
              ))}
              <Button variant="primary" type="submit">
                confirm ticket ↗️
              </Button>
              <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
                You will be taken to the event's portal, where you will be
                required to log in and confirm your booking.
              </p>
            </div>
          }
          else={
            // Selected Events
            <div className="flex w-full flex-col gap-[16px] md:w-fit md:max-w-[300px]">
              <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
                Selected Event
              </p>
              <EventCardComponent
                key={event?._id}
                status={"selected"}
                onClick={handleEventClick}
                event={event ?? eventsMaster[0]}
              />

              <Button variant="primary" type="submit" isLoading={isLoading}>
                confirm ticket ↗️
              </Button>
              <p className="text-[14px] font-normal leading-[20px] text-simpleGray600">
                You will be taken to the event's portal, where you will be
                required to log in and confirm your booking.
              </p>
            </div>
          }
        />
      </form>
    </Container>
  );
}
