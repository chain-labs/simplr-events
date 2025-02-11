import React, { useEffect, useState } from "react";

import {
  EtherspotBundler,
  ModularSdk,
  SessionKeyValidator,
} from "@etherspot/modular-sdk";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { Address, createWalletClient, http } from "viem";
import { arbitrumSepolia, base } from "viem/chains";

import { envVars } from "@/utils/envVars";

import { useUser } from "../../UserContext";

const useEtherspot = () => {
  const { wallets } = useWallets();
  const [sdk, setSdk] = useState<ModularSdk | null>(null);

  const { user, setUser } = useUser();

  const initializeEtherspot = async () => {
    console.log({ wallets });

    const wallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    if (!wallet) return;

    const provider = await wallet.getEthereumProvider();

    const ethereumProvider = createWalletClient({
      account: wallet.address as `0x${string}`,
      chain: base,
      transport: http(
        `https://testnet-rpc.etherspot.io/v2/421614?api-key=${envVars.etherspotApi}`
      ),
    });

    console.log({ wallet, provider });

    const modularSdk = new ModularSdk(ethereumProvider, {
      chainId: base.id,
      bundlerProvider: new EtherspotBundler(base.id, envVars.etherspotApi),
    });

    console.log({ modularSdk });
    const address: string = await modularSdk.getCounterFactualAddress();

    const sessionKeyModule = await SessionKeyValidator.create(modularSdk);

    const typedData = {
      domain: {
        name: "EtherspotModular",
        version: "1.0.0",
        chainId: base.id,
        verifyingContract: `0x${address.slice(2)}` as Address,
      },
      types: {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    };

    const signTypedData = await modularSdk.signTypedData(typedData);
    // const sign = await modularSdk.signMessage({ message: "Hello" });

    console.log("signature: ", signTypedData);
    setSdk(modularSdk);
  };

  useEffect(() => {
    if (user?.email) {
      initializeEtherspot();
    }
    // const modularSdk = new ModularSdk(
    //   {
    //     privateKey: process.env.WALLET_PRIVATE_KEY,
    //   },
    //   {
    //     chainId: Number(process.env.CHAIN_ID),
    //     bundlerProvider: new EtherspotBundler(
    //       Number(process.env.CHAIN_ID),
    //       bundlerApiKey,
    //       customBundlerUrl
    //     ),
    //   }
    // );
  }, [wallets]);
};

export default useEtherspot;
