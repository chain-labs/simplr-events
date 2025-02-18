import { useEffect, useState } from "react";

import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/utils/envVars";

import { CONTRACTS } from "../contracts";
import abi from "./abi.json";

const { isTestNetwork } = envVars;

export type IPaymentContract = {
  abi: any;
  address: `0x${string}`;
  decimals: number;
};

const useUSDCContract = () => {
  const [contract, setContract] = useState<IPaymentContract>({
    abi,
    address: "0x",
    decimals: 6,
  });

  useEffect(() => {
    if (isTestNetwork) {
      const address = CONTRACTS[arbitrumSepolia.id]
        .paymentToken as unknown as `0x${string}`;
      const decimals = 6;
      setContract({ abi, address, decimals });
    } else {
      const address = CONTRACTS[arbitrum.id]
        .paymentToken as unknown as `0x${string}`;
      const decimals = 6;
      setContract({ abi, address, decimals });
    }
  }, []);

  return contract;
};

export default useUSDCContract;
