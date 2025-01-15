"use client";

import { useEffect, useRef, useState } from "react";

import { UseFormRegisterReturn } from "react-hook-form";
import { PiMagnifyingGlass } from "react-icons/pi";

import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import { cn } from "@/utils/cn";
import { dummyEvents, dummyTickets } from "@/utils/dummyData";

import { Input } from "../ui/input";
import EventCardComponent from "./event-card-component";

export default function EventSearchComponent({
  register,
}: {
  register: UseFormRegisterReturn<"event">;
}) {
  // TODO: Replace dummyTickets with real data
  const data = dummyEvents;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setLoading(true);
        // Simulate API call
        const filteredEvents = data.filter((event) =>
          event.eventName.toLowerCase().includes(search.toLowerCase())
        );
        setResults(filteredEvents);
        setIsOpen(true); // Open menu when results are available
        setLoading(false);
      } else {
        setResults([]);
        setIsOpen(false); // Close menu when search is empty
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        placeholder="Select event"
        icon={<PiMagnifyingGlass />}
        iconPosition="left"
        value={search}
        onFocus={() => setIsOpen(true)}
        className={cn(
          selectedEvent !== undefined &&
            "border-[#D6BBFB] text-simpleGray900 shadow-[0_0_0_4px_#9E77ED3D]"
        )}
        {...register}
        onChange={(e) => {
          register.onChange(e);
          setSearch(e.target.value);
          setSelectedEvent(undefined);
        }}
        onInvalid={(e) => {
          if (selectedEvent === undefined || search === "") {
            e.currentTarget.setCustomValidity("Please select an event");
          } else {
            e.currentTarget.setCustomValidity("");
          }
        }}
        onSubmit={(e) => {
          console.log("onSubmit", e);
          if (selectedEvent === undefined || search === "") {
            e.preventDefault();
            e.currentTarget.reportValidity();
          }
        }}
        required
      />

      {results.length > 0 && isOpen && (
        <div className="absolute z-10 mt-2 flex max-h-[320px] w-full flex-col gap-[4px] overflow-y-scroll rounded-[8px] bg-white p-[8px] shadow-lg">
          {results.map((event) => (
            <EventCardComponent
              key={event.id}
              {...event}
              startDate="1st May, 2025"
              status={
                selectedEvent?.id === event.id ? "grey selected" : "white"
              }
              onClick={() => {
                setSelectedEvent(event);
                setSearch(event.eventName);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
