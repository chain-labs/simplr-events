import { ReactNode } from "react";

import { IconType } from "react-icons";

interface Event {
  id: string;
  eventName: string;
  location: string;
  EventIcon: PiShootingStar; // need to remove this for backend
  contractAddress: `0x${string}`;
  deadline: string; // event date to end - backend
  startDateTime: string; // event date - display as it is
  endDateTime: string; // event date - display as it is
}
