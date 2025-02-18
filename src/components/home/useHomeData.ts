import React, { useEffect } from "react";

import { useAccount } from "wagmi";

import { Event } from "@/types/event";
import { Order, Ticket } from "@/types/ticket";
import api from "@/utils/axios";

const useHomeData = () => {
  const [myTickets, setMyTickets] = React.useState<Order[]>([]);
  const [escrowTickets, setEscrowTickets] = React.useState<Order[]>([]);
  const [sellingTickets, setSellingTickets] = React.useState<Order[]>([]);
  const [marketplaceTickets, setMarketplaceTickets] = React.useState<
    Record<string, Order[]>
  >({});
  const [eventMap, setEventMap] = React.useState<Record<string, Event>>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const account = useAccount();

  useEffect(() => {
    const toOrder = (data: any, eventMap: Record<string, Event>) => {
      return data.map((listing: any) => {
        const order: Order = {
          price: listing.price,
          signature: "",
          ticket: {
            _id: listing._id,
            event: eventMap[listing.event],
            tokenId: listing.tokenId,
            seat: listing.seat,
          },
        };

        return order;
      });
    };

    api
      .get(
        `/marketplace?network=${"arbitrum"}&account=${account.address?.toLowerCase()}`
      )
      .then(({ data }) => {
        setMyTickets(toOrder(data.userTickets.owned, data.eventMap));
        setEscrowTickets(toOrder(data.userTickets.escrow, data.eventMap));
        setSellingTickets(toOrder(data.userTickets.selling, data.eventMap));

        const marketPlace: Record<string, Order[]> = {};
        Object.keys(data.marketplaceTickets).forEach((event: string) => {
          const currentEvent = data.eventMap[event];

          const currentData = data.marketplaceTickets[event];

          console.log({ currentData, currentEvent });

          currentData.forEach((listing: any) => {
            const order: Order = {
              price: listing.price,
              signature: "",
              ticket: {
                _id: listing._id,
                event: currentEvent,
                tokenId: listing.tokenId,
                seat: listing.seat,
              },
            };
            if (!marketPlace[event]) {
              marketPlace[event] = [];
            }
            marketPlace[event].push(order);
          });
        });
        setMarketplaceTickets(marketPlace);
        setEventMap(data.eventMap);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("myTickets:", myTickets);
    console.log("escrowTickets:", escrowTickets);
    console.log("sellingTickets:", sellingTickets);
    console.log("marketplaceTickets:", marketplaceTickets);
    console.log("eventMap:", eventMap);
  }, [myTickets, escrowTickets, sellingTickets, marketplaceTickets, eventMap]);

  return {
    myTickets,
    escrowTickets,
    sellingTickets,
    marketplaceTickets,
    eventMap,
    isLoading,
  };
};

export default useHomeData;
