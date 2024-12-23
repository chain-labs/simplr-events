import { ReactNode } from "react";

import { IconType } from "react-icons/lib";

interface Ticket {
  id: string;
  eventName: string;
  seat: string;
  ticketId: string;
  orderId: string;
  startDate: string;
  endDate: string;
  startDay: number;
  startTime: string;
  endDay: number;
  endTime: string;
  other: string;
  location: string;
  EventIcon: IconType | ReactNode;
  price: string;
  priceCategory: "average" | "highest" | "lowest";
}