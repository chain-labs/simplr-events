import Link from "next/link";

import {
  PiCalendarDotDuotone,
  PiCalendarDotsDuotone,
  PiInfoDuotone,
  PiMoneyWavyDuotone,
  PiShootingStar,
  PiShootingStarDuotone,
} from "react-icons/pi";
import { formatUnits, parseUnits } from "viem";

import { Order } from "@/types/ticket";
import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { LabelSmall } from "../ui/label";

type HomeTicketCardComponentProps = {
  order: Order;
  bgGradient?: "yellow" | "pink";
  isLoading?: boolean;
};

export default function HomeTicketCardComponent({
  order,
  bgGradient,
  isLoading,
}: HomeTicketCardComponentProps) {
  if (isLoading || !order) {
    return <HomeTicketCardSkeleton />;
  }

  

  return (
    <div
      key={order?.ticket?._id}
      className="grid-flex-row relative z-0 grid w-full min-w-fit gap-[16px] overflow-hidden rounded-[16px] bg-simpleWhite p-[16px] md:w-fit"
    >
      {/* bg gradient */}
      <div
        className={cn(
          "absolute bottom-0 left-0 z-[-1] h-[20%] w-full bg-gradient-to-b",
          bgGradient === "yellow" && "from-[#F2FF4900] to-[#F2FF4980]",
          bgGradient === "pink" && "from-[#FB62F600] to-[#FB62F680]"
        )}
      ></div>

      {/* event, seat and ticketid */}
      <div className="flex items-center gap-[4px] text-[16px] leading-[24px] text-simpleGray700">
        {/* <order.ticket.event.image className="h-[24px] w-[24px] rounded-full object-cover text-[24px]" /> */}
        <PiShootingStarDuotone size={24} /> {order?.ticket?.event?.eventName}
      </div>
      <div className="flex flex-col">
        <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
          {order?.ticket?.seat}
        </p>
        <p className="flex gap-[1ch] text-[16px] leading-[24px] text-simpleGray700">
          #{order?.ticket?.tokenId}
        </p>
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* start and end date */}
      <div className="grid items-center gap-[16px] md:grid-flow-col">
        <div className="flex flex-col gap-[4px] whitespace-nowrap">
          <LabelSmall className="text-simpleGray700">
            <PiCalendarDotDuotone />
            Start Date
          </LabelSmall>

          <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
            {order?.ticket?.event?.startDateTime}
          </p>
        </div>
        <div className="hidden h-full w-[1px] bg-simpleGray400 md:block" />
        <div className="flex flex-col gap-[4px] whitespace-nowrap">
          <LabelSmall className="text-simpleGray700">
            <PiCalendarDotsDuotone />
            End Date
          </LabelSmall>
          <p className="text-[16px] font-semibold leading-[20px] text-simpleGray900">
            {order?.ticket?.event?.endDateTime ?? "-"}
          </p>
        </div>
      </div>

      {/* additional info */}
      <div className="flex flex-col gap-[4px]">
        <LabelSmall className="text-simpleGray700">
          <PiInfoDuotone />
          Additional Feild
        </LabelSmall>
        <p className="flex flex-col gap-[8px] text-[16px] font-semibold leading-[20px] text-simpleGray900">
          {Object.entries(order?.ticket?.event?.additionalInfo || {}).map(
            ([key, value]) => (
              <div key={key} className="flex flex-col">
                {/* <span className="text-[12px] uppercase tracking-widest text-simpleGray700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span> */}
                <span className="text-[16px] font-semibold text-simpleGray900">
                  {String(value)}
                </span>
              </div>
            )
          )}
        </p>
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* price */}
      <div className="flex flex-col items-start justify-start gap-[4px]">
        <LabelSmall className="text-simpleGray700">
          <PiMoneyWavyDuotone />
          Price
        </LabelSmall>
        <p className="text-[20px] font-bold leading-[20px] text-simpleGray900">
          $
          {order?.price !== "N/A"
            ? formatUnits(BigInt(order?.price ?? "0"), 6)
            : "N/A"}
        </p>
      </div>

      {/* link which lead to viewing ticket  */}
      <Link href={`/buy-ticket/${order?.ticket?._id}`}>
        <Button variant="primary-blue" size="sm" className="w-fit">
          view ticket
        </Button>
      </Link>
    </div>
  );
}

export function HomeTicketCardSkeleton() {
  return (
    <div className="grid-flex-row relative z-0 grid w-full min-w-fit animate-pulse gap-[16px] overflow-hidden rounded-[16px] bg-simpleWhite p-[16px] md:w-fit">
      {/* Event name skeleton */}
      <div className="flex items-center gap-[4px]">
        <div className="h-[24px] w-[24px] rounded-full bg-gray-200" />
        <div className="h-[24px] w-[150px] rounded-md bg-gray-200" />
      </div>

      {/* Seat and token ID skeleton */}
      <div className="flex flex-col gap-[8px]">
        <div className="h-[20px] w-[80px] rounded-md bg-gray-200" />
        <div className="h-[24px] w-[100px] rounded-md bg-gray-200" />
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* Date skeletons */}
      <div className="grid items-center gap-[16px] md:grid-flow-col">
        <div className="flex flex-col gap-[4px]">
          <div className="h-[16px] w-[100px] rounded-md bg-gray-200" />
          <div className="h-[20px] w-[120px] rounded-md bg-gray-200" />
        </div>
        <div className="hidden h-full w-[1px] bg-simpleGray400 md:block" />
        <div className="flex flex-col gap-[4px]">
          <div className="h-[16px] w-[100px] rounded-md bg-gray-200" />
          <div className="h-[20px] w-[120px] rounded-md bg-gray-200" />
        </div>
      </div>

      {/* Additional info skeleton */}
      <div className="flex flex-col gap-[4px]">
        <div className="h-[16px] w-[120px] rounded-md bg-gray-200" />
        <div className="h-[20px] w-[150px] rounded-md bg-gray-200" />
      </div>

      <div className="h-[1px] w-full bg-simpleGray400" />

      {/* Price skeleton */}
      <div className="flex flex-col gap-[4px]">
        <div className="h-[16px] w-[60px] rounded-md bg-gray-200" />
        <div className="h-[20px] w-[100px] rounded-md bg-gray-200" />
      </div>

      {/* Button skeleton */}
      <div className="h-[36px] w-[120px] rounded-md bg-gray-200" />
    </div>
  );
}
