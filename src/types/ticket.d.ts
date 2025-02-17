import { ReactNode } from "react";

import { IconType } from "react-icons/lib";

import { Event } from "./event";

// interface Ticket {
//   id: string;
//   eventName: string;
//   seat: string;
//   ticketId: string;
//   orderId: string;
//   startDate: string;
//   endDate: string;
//   startDay: number;
//   startTime: string;
//   endDay: number;
//   endTime: string;
//   other: string;
//   location: string;
//   EventIcon: IconType | ReactNode;
//   price: string;
//   priceCategory: "average" | "highest" | "lowest";
// }

interface Ticket {
  _id: string;
  event: Event;
  tokenId: string;
  seat: string;
}

interface Order {
  id: string;
  ticket: Ticket;
  price: string;
  signature: string;
}
