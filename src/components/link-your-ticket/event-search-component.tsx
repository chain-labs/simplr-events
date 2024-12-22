"use client";

import { useEffect, useRef, useState } from "react";

import { PiMagnifyingGlass, PiShootingStarDuotone } from "react-icons/pi";

import { Input } from "../ui/input";
import EventCardComponent from "./event-card-component";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  icon: typeof PiShootingStarDuotone;
};

// Dummy data
const dummyEvents: Event[] = [
  {
    id: "1",
    name: "Tech Conference 2024",
    date: "March 15, 2024",
    location: "San Francisco, CA",
    icon: PiShootingStarDuotone,
  },
  {
    id: "2",
    name: "Web Summit",
    date: "April 20, 2024",
    location: "Lisbon, Portugal",
    icon: PiShootingStarDuotone,
  },
  {
    id: "3",
    name: "AI & ML Expo",
    date: "May 10, 2024",
    location: "New York, NY",
    icon: PiShootingStarDuotone,
  },
  {
    id: "4",
    name: "Blockchain Summit",
    date: "June 5, 2024",
    location: "Singapore",
    icon: PiShootingStarDuotone,
  },
  {
    id: "5",
    name: "Developer Conference",
    date: "July 15, 2024",
    location: "Berlin, Germany",
    icon: PiShootingStarDuotone,
  },
  {
    id: "6",
    name: "Startup Festival",
    date: "August 30, 2024",
    location: "Tokyo, Japan",
    icon: PiShootingStarDuotone,
  },
];

export default function EventSearchComponent() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

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
        const filteredEvents = dummyEvents.filter((event) =>
          event.name.toLowerCase().includes(search.toLowerCase())
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
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {loading && <div className="mt-2">Loading...</div>}

      {results.length > 0 && isOpen && (
        <div className="absolute z-10 mt-2 flex max-h-[320px] w-full flex-col gap-[4px] overflow-y-scroll rounded-[8px] bg-white p-[8px] shadow-lg">
          {results.map((event) => (
            <EventCardComponent
              key={event.id}
              Icon={event.icon}
              name={event.name}
              date={event.date}
              location={event.location}
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
