"use client";

import { useEffect, useRef, useState } from "react";

import { PiMagnifyingGlass } from "react-icons/pi";

import { Ticket } from "@/types/ticket";
import { dummyTickets } from "@/utils/dummyData";

import { Input } from "../ui/input";
import TicketCardComponent from "./ticket-card-component";

export default function TicketSearchComponent() {
  // TODO: Replace dummyTickets with real data
  const data = dummyTickets;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Ticket[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Ticket[]>([]);
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
        placeholder="Select for ticket"
        icon={
          // @ts-expect-error
          <PiMagnifyingGlass />
        }
        iconPosition="left"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {loading && <div className="mt-2">Loading...</div>}

      {results.length > 0 && isOpen && (
        <div className="absolute z-10 mt-2 flex max-h-[320px] w-full flex-col gap-[4px] overflow-y-scroll rounded-[8px] bg-white p-[8px] shadow-lg">
          {results.map((event) => (
            <TicketCardComponent
              key={event.id}
              {...event}
              status={
                selectedEvents.find(
                  (selectedEvent) => selectedEvent.id === event.id
                )
                  ? "grey selected"
                  : "white"
              }
              onClick={() => {
                setSelectedEvents((prev) =>
                  prev.find((prevEvent) => prevEvent.id === event.id)
                    ? prev.filter((prevEvent) => prevEvent.id !== event.id)
                    : [...prev, event]
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
