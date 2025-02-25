import React, { useEffect, useMemo } from "react";

import { useAccount } from "wagmi";

import { Event } from "@/types/event";
import { Order, Ticket } from "@/types/ticket";
import api from "@/utils/axios";

import { useUser } from "../../../UserContext";

type TicketResponse = {
  ticket: {
    _id: string;
    event: string;
    tokenId: string;
    seat: string;
  };
  price: string;
  signature: string;
};

export interface MarketplaceDataResponse {
  userTickets: {
    owned: TicketResponse[];
    escrow: TicketResponse[];
    selling: TicketResponse[];
  };
  marketplaceTickets: Record<string, TicketResponse[]>;
  eventMap: Record<string, Event>;
}

const useHomeData = () => {
  const [totalData, setTotalData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { user } = useUser();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const marketData = await api.get(
          `/marketplace?network=${"arbitrum"}&account=${user?.address?.toLowerCase()}`,
          { signal: controller.signal }
        );

        console.log({ totalData: JSON.parse(marketData.data) });

        setTotalData(marketData.data);

        // setTotalData(marketData.data);
      } catch (error: any) {
        if (!error.isCancelled) {
          console.error("Error fetching data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.address) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [user?.address]);

  return {
    totalData,
    isLoading,
  };
};

export default useHomeData;
