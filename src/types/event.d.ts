import { ReactNode } from "react";

import { IconType } from "react-icons";

interface Event {
  additionalInfo: string[];
  contractAddress: string;
  createdAt: string;
  deadline: string;
  endDateTime: string;
  eventName: string;
  image: string;
  location: string;
  seatInputType: "input" | "dropdown";
  seatOptions?: string[];
  startDateTime: string;
  updatedAt: string;
  verificationType: string;
  __v: number;
  _id: string;
}
