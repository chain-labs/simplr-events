import React from "react";

import { useAccount, useReadContract } from "wagmi";

import useUSDCContract from "@/contracts/USDC";

const useBuyTicket = () => {
  const account = useAccount();
  const USDC = useUSDCContract();
  const { data: allowance } = useReadContract({
    abi: USDC.abi,
    address: USDC.address,
    functionName: "allowance",
  });
  const approveFundsTransfer = async () => {};

  const buyTicket = async () => {};
};

export default useBuyTicket;
