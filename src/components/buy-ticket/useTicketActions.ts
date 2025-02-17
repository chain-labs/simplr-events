import React from "react";

import { waitForTransactionReceipt } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useWriteContract,
} from "wagmi";

import useEscrowContract from "@/contracts/Escrow";

const useTicketActions = () => {
  const [loading, setLoading] = React.useState(false);

  const { writeContractAsync: writeContract } = useWriteContract();
  const config = useConfig();
  const client = usePublicClient();

  const account = useAccount();

  const EscrowContract = useEscrowContract();

  const disputeTicket = async (tokenId: string, eventContract: string) => {
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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { confirmBuy, disputeTicket, actionLoading: loading };
};

export default useTicketActions;
