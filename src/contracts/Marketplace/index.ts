import { useEffect, useState } from "react";

import { arbitrumSepolia, base } from "wagmi/chains";

import { envVars } from "@/utils/envVars";

import { IContract } from "../Escrow";
import { CONTRACTS } from "../contracts";
import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useMarketplaceContract = () => {
  const [contractDetails, setContractDetails] = useState<IContract>({
    address: "0x",
    abi,
  });

  useEffect(() => {
    const address = isTestNetwork
      ? (CONTRACTS[base.id].marketplace as unknown as `0x${string}`)
      : (CONTRACTS[base.id].marketplace as unknown as `0x${string}`);

    setContractDetails({ abi, address });
  }, []);

  return contractDetails;
};

export default useMarketplaceContract;
