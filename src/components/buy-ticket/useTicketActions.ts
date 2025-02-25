import React from "react";

import { waitForTransactionReceipt } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useWriteContract,
} from "wagmi";

import useEscrowContract from "@/contracts/Escrow";
import api from "@/utils/axios";

const useTicketActions = () => {
  const [loading, setLoading] = React.useState(false);

  const { writeContractAsync: writeContract } = useWriteContract();
  const config = useConfig();
  const client = usePublicClient();

  const account = useAccount();

  const EscrowContract = useEscrowContract();

  const disputeTicket = async (
    tokenId: string,
    eventContract: string,
    buyer: string,
    dispute: { reason: string; from: "Seller" | "Buyer" }
  ) => {
    setLoading(true);
    try {
      const options = {
        abi: EscrowContract.abi,
        address: EscrowContract.address,
        functionName: "dispute",
        args: [BigInt(tokenId), eventContract],
      };

      const sim = await client?.estimateGas({
        ...options,
        account: account.address,
      });
      const tx = await writeContract({
        ...options,
        gas: BigInt(Math.max(Number(sim as bigint) + 200000, 1000000)),
      });

      await waitForTransactionReceipt(config, { hash: tx });

      await api.post("/listing/dispute", {
        reason: dispute.reason,
        buyerId: buyer,
        ticketId: `ticket-${eventContract.toLowerCase()}-${tokenId}`,
        disputeFrom: dispute.from,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to dispute ticket");
    } finally {
      setLoading(false);
    }
  };

  const confirmBuy = async (tokenId: string, eventContract: string) => {
    setLoading(true);
    try {
      const options = {
        abi: EscrowContract.abi,
        address: EscrowContract.address,
        functionName: "releaseFunds",
        args: [BigInt(tokenId), eventContract],
      };

      const sim = await client?.estimateGas({
        ...options,
        account: account.address,
      });
      const tx = await writeContract({
        ...options,
        gas: BigInt(Math.max(Number(sim as bigint) + 200000, 1000000)),
      });

      await waitForTransactionReceipt(config, { hash: tx });

      await api.post("/listing/resolve", {
        buyerId: account.address,
        ticketId: `ticket-${eventContract.toLowerCase()}-${tokenId}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to confirm ticket purchase");
    } finally {
      setLoading(false);
    }
  };

  return { confirmBuy, disputeTicket, actionLoading: loading };
};

export default useTicketActions;
