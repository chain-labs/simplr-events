"use client";

import { IconType } from "react-icons/lib";
import { PiCheck } from "react-icons/pi";

import { cn } from "@/utils/cn";

import { PSmall } from "../ui/paragraph";

type EventCardComponentProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | IconType;
  name: string;
  date: string;
  location: string;
  status: "selected" | "grey" | "white" | "grey selected";
  onClick?: () => void;
};
export default function EventCardComponent({
  Icon,
  name,
  date,
  location,
  status,
  onClick,
}: EventCardComponentProps) {
  return (
    <div
      key={name}
      className={cn(
        "flex gap-[4px] rounded-[16px] p-[16px] text-simpleGray900",
        status === "white" && "bg-simpleWhite",
        status === "grey" && "bg-simpleGray200",
        status === "selected" && "bg-simpleBlue text-simpleWhite",
        status === "grey selected" && "bg-simpleGray200"
      )}
      onClick={onClick}
    >
      <div className="flex w-full flex-col gap-[4px]">
        <Icon className={cn("text-[32px]")} />
        <div className="flex flex-col">
          <p className="text-[20px] font-bold leading-[30px] text-[inherit]">
            {name}
          </p>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {date}
          </PSmall>
          <PSmall
            className={cn(
              status === "selected" ? "text-simpleWhite" : "text-simpleGray700"
            )}
          >
            {location}
          </PSmall>
        </div>
      </div>
      {status === "selected" && (
        <PiCheck className="text-[20px] text-simpleWhite" />
      )}
      {status === "grey selected" && (
        <PiCheck className="text-[20px] text-simpleBlue" />
      )}
    </div>
  );
}
