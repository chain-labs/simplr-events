import { useEffect, useState } from "react";

import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/utils/envVars";

import { IContract } from "../Escrow";
import { CONTRACTS } from "../contracts";
import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useEventContract = () => {
  const [contract, setContract] = useState<IContract>({ abi, address: "0x" });
  useEffect(() => {
    if (isTestNetwork) {
      const address = CONTRACTS[arbitrumSepolia.id]
        .event as unknown as `0x${string}`;
      setContract({ abi, address });
    } else {
      const address = CONTRACTS[arbitrum.id].event as unknown as `0x${string}`;
      setContract({ abi, address });
    }
  }, []);
  return contract;
};

export default useEventContract;
