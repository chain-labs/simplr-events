import { useEffect, useState } from "react";

import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/utils/envVars";

import { CONTRACTS } from "../contracts";
import abi from "./abi.json";

const { isTestNetwork } = envVars;

export type IContract = {
  abi: any;
  address: `0x${string}`;
};

const useEscrowContract = () => {
  const [contractDetails, setContractDetails] = useState<IContract>({
    address: "0x",
    abi,
  });

  useEffect(() => {
    const address = isTestNetwork
      ? (CONTRACTS[arbitrumSepolia.id].escrow as unknown as `0x${string}`)
      : (CONTRACTS[arbitrum.id].escrow as unknown as `0x${string}`);

    setContractDetails({ abi, address });
  }, []);

  return contractDetails;
};

export default useEscrowContract;
