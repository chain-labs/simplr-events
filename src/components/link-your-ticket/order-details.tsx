"use client";

import { ButtonHTMLAttributes, MouseEvent, useMemo, useState } from "react";

import { useReadContract } from "wagmi";

import useEventContract from "@/contracts/Event";

import { centralizedState } from ".";
import { ComponentWithLabel } from "../component/component-with-label";
import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PLarge, PMedium, PSmall } from "../ui/paragraph";
import useTicketMint from "./hooks/useTicketMint";

export default function OrderDetails({
  data,
  navigation,
  setStates,
}: {
  data: centralizedState;
  navigation: {
    next: () => void;
    back: () => void;
  };
  setStates: React.Dispatch<
    React.SetStateAction<
      "linking-ticket" | "order-details" | "link-and-verify-ticket"
    >
  >;
}) {
  const EventContract = useEventContract();
  const [mintLoading, setMintLoading] = useState(false);

  const { data: tokenIdCounter, error } = useReadContract({
    abi: EventContract.abi,
    address: data.eventObj.contractAddress as `0x${string}`,
    functionName: "tokenIdCounter",
    args: [],
    query: {
      enabled: !!data.eventObj.contractAddress,
    },
  });

  const tokenId = useMemo(() => {
    console.log({ tokenIdCounter });
    if (tokenIdCounter) {
      return (tokenIdCounter as bigint) + BigInt(1);
    }

    return 0;
  }, [tokenIdCounter]);

  const { mintTicket } = useTicketMint();

  const handleConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMintLoading(true);
    const { eventObj, seat, orderNumber, ticketData } = data;
    console.log({ data });

    await mintTicket({
      eventObj,
      tokenId: tokenId.toString(),
      seat,
      orderNumber,
      ticketData: ticketData ?? "",
    });

    setMintLoading(false);
    setStates("link-and-verify-ticket");
  };

  return (
    <Container className="max-w-[780px]">
      <div className="flex gap-[64px]">
        <div className="flex w-full flex-col gap-[16px]">
          <H4 className="text-simpleGray700">Your order details</H4>

          {/* order id  */}
          <ComponentWithLabel label="Order ID" gap={4}>
            <PLarge>{data.orderNumber}</PLarge>
          </ComponentWithLabel>

          {/* tickets */}
          <div className="flex gap-[8px]">
            <div
              key={data.event}
              className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-simpleGray200 p-[8px]"
            >
              <ComponentWithLabel label={`Ticket #${tokenId}`} gap={4}>
                <PMedium className="font-bold">Seat {data.seat}</PMedium>
              </ComponentWithLabel>
            </div>
          </div>

          {/* start and end datetime */}
          <div className="flex flex-wrap gap-[16px] md:flex-row md:gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              <ComponentWithLabel label="Start Date" gap={4}>
                <PSmall className="font-bold">
                  {data.eventObj.startDateTime}
                </PSmall>
              </ComponentWithLabel>
            </div>

            <div className="flex flex-col gap-[4px]">
              <ComponentWithLabel label="End Date" gap={4}>
                <PSmall className="font-bold">
                  {data.eventObj.endDateTime ?? "N/A"}
                </PSmall>
              </ComponentWithLabel>
            </div>
          </div>

          {/* another field */}
          <div className="flex flex-col gap-[4px]">
            <ComponentWithLabel label="Another Field" gap={4}>
              <PSmall className="font-bold">{""}</PSmall>
            </ComponentWithLabel>
          </div>
          <div className="mt-[16px] flex w-full items-center justify-between gap-[8px] md:mt-0">
            <Button
              variant="secondary"
              onClick={navigation.back}
              className="w-full md:w-auto"
            >
              {" "}
              go back{" "}
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              className="w-full md:w-auto"
              isLoading={mintLoading}
            >
              {" "}
              confirm & link{" "}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
