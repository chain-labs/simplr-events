"use client";

import { ButtonHTMLAttributes, MouseEvent, useEffect, useMemo } from "react";

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
}: {
  data: centralizedState;
  navigation: {
    next: () => void;
    back: () => void;
  };
}) {
  const EventContract = useEventContract();

  const { data: tokenIdCounter, error } = useReadContract({
    abi: [
      {
        type: "function",
        inputs: [],
        name: "tokenIdCounter",
        outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
        stateMutability: "view",
      },
    ],
    address: data.eventObj.contractAddress as `0x${string}`,
    functionName: "tokenIdCounter",
    args: [],
    query: {
      enabled: !!data.eventObj.contractAddress,
    },
  });

  useEffect(() => {
    // Your effect logic here
    if (error) {
      console.log({ error });
    }
  }, [error]);

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
    const { eventObj, seat, orderNumber, ticketData } = data;
    await mintTicket({
      eventObj,
      tokenId: tokenId.toString(),
      seat,
      orderNumber,
      ticketData: ticketData ?? "",
    });
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
