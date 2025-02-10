import { useEffect, useMemo, useState } from "react";

import {
  NexusClient,
  createBicoPaymasterClient,
  createSmartAccountClient,
  toSigner,
} from "@biconomy/abstractjs";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ParamCondition } from "@zerodev/permissions/policies";
import { createWalletClient, custom, http, parseEther, parseUnits } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, base } from "viem/chains";

import { envVars } from "@/utils/envVars";

const BUNDLER_URL = `https://bundler.biconomy.io/api/v2/8453/dewj402.wh1289hU-7E49-85b-af80-k9XmQ2yNs`;
const PAYMASTER_URL = `https://paymaster.biconomy.io/api/v2/${base.id}/p6ApYTI5l.02853ff5-d075-4241-a24b-78eb8db7131d`;
const useNexusClient = () => {
  const { login } = usePrivy();
  const { wallets } = useWallets();
  const [nexusClient, setNexusClient] = useState<NexusClient | null>(null);
  useEffect(() => {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );
    if (embeddedWallet) {
      (async () => {
        const provider = await embeddedWallet.getEthereumProvider();
        const privateKey = generatePrivateKey();
        const account = privateKeyToAccount(`${privateKey}`);

        const nexusClient = await createSmartAccountClient({
          signer: provider,
          chain: base,
          transport: http(
            `https://base-mainnet.g.alchemy.com/v2/${envVars.alchemyApiKey}`
          ),
          bundlerTransport: http(BUNDLER_URL),
          paymaster: createBicoPaymasterClient({ paymasterUrl: PAYMASTER_URL }),
        });

        const maxFeePerGas = parseUnits("1000", 9);

        const hash = await nexusClient.sendUserOperation({
          calls: [
            {
              to: "0x601F2385510469256033F0F2b0608Ff1Ad30637a",
              value: parseEther("0"),
            },
          ],
          maxFeePerGas: BigInt("1000000000000"),
        });
        console.log({ hash });
        const receipt = await nexusClient.waitForUserOperationReceipt({ hash });
        console.log({ receipt });

        console.log({ nexusClient });

        setNexusClient(nexusClient);
      })();
    }
  }, [wallets]);

  const sendDummyTx = async () => {
    if (!nexusClient) return;
    const hash = await nexusClient.sendUserOperation({
      calls: [
        {
          to: "0x601F2385510469256033F0F2b0608Ff1Ad30637a",
          value: parseEther("0"),
        },
      ],
    });
    console.log({ hash });
    const receipt = await nexusClient.waitForUserOperationReceipt({ hash });
    console.log({ receipt });
  };

  const accountAddress = useMemo(() => {
    if (!nexusClient) return null;
    return nexusClient.account.address;
  }, [nexusClient]);

  return { nexusClient, accountAddress, sendDummyTx };
};

export default useNexusClient;
