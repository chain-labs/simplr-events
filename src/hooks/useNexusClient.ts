import { useEffect, useMemo, useState } from "react";

import {
  NexusClient,
  createBicoPaymasterClient,
  createSmartAccountClient,
  toSigner,
} from "@biconomy/abstractjs";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createWalletClient, custom, http, parseEther } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

const BUNDLER_URL = `https://bundler.biconomy.io/api/v3/${arbitrumSepolia.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`;
const PAYMASTER_URL = `https://paymaster.biconomy.io/api/v2/${arbitrumSepolia.id}/F7wyL1clz.75a64804-3e97-41fa-ba1e-33e98c2cc703`;
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
          chain: arbitrumSepolia,
          transport: http(),
          bundlerTransport: http(BUNDLER_URL),
          paymaster: createBicoPaymasterClient({ paymasterUrl: PAYMASTER_URL }),
        });

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
