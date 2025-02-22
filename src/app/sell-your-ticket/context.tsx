import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  USER_TICKETS_QUERY,
  USER_TICKET_RESPONSE_TYPE,
} from "@/gql/queries/user-tickets.query";
import { Event } from "@/types/event";
import { Ticket } from "@/types/ticket";
import api from "@/utils/axios";
import { envVars } from "@/utils/envVars";

import { useUser } from "../../../UserContext";

// Define the type for your ticket store
interface TicketStore {
  // Add your ticket-related state and methods here
  // For example:
  ticketsOwned: Ticket[];
  eventsList: Event[];
  selectedTickets: Ticket[];
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

// Create initial state
const initialState: TicketStore = {
  ticketsOwned: [],
  eventsList: [],
  selectedTickets: [],
  setSelectedTickets: () => {},
};

// Create context
const TicketContext = createContext<TicketStore>(initialState);

// Create provider component
interface TicketProviderProps {
  children: ReactNode;
}

export const TicketStoreProvider: React.FC<TicketProviderProps> = ({
  children,
}) => {
  // Add your state management logic here
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  const [ticketsOwned, setTicketsOwned] = useState<Ticket[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);

  // For example, using useState or useReducer

  const { user } = useUser();

  useEffect(() => {
    const getUserTickets = async () => {
      const eventsResponse = await api.get(
        `/user/${user?.address}/tickets?network=arbitrum`
      );
      const eventsData = eventsResponse.data;

      const ticketsOwned = eventsData.ticketsOwned.map((ticket: any) => {
        const event = eventsData.eventMap[ticket.event];
        return {
          ...ticket,
          event,
        };
      });

      const eventsList: Event[] = Object.keys(eventsData.eventMap).map(
        (key) => eventsData.eventMap[key]
      );
      console.log({ eventsList });

      setEventsList(eventsList);
      setTicketsOwned(ticketsOwned);
    };

    if (user?.address) {
      getUserTickets();
    }
  }, [user?.address]);

  const value = {
    ticketsOwned,
    eventsList,
    selectedTickets,
    setSelectedTickets,
    // Add your methods here
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

// Create custom hook for using the context
export const useTicketStore = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicketStore must be used within a TicketProvider");
  }
  return context;
};
