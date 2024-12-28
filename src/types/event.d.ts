import { ReactNode } from "react";

import { IconType } from "react-icons";

interface Event {
  id: string;
  eventName: string;
  location: string;
  EventIcon: IconType | ReactNode;
  contractAddress: `0x${string}`;
  image: string;
  deadline: string;
}
