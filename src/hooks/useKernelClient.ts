"use client";

import React, { useCallback, useEffect } from "react";

import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  deserializePermissionAccount,
  serializePermissionAccount,
  toPermissionValidator,
} from "@zerodev/permissions";
import { toSudoPolicy } from "@zerodev/permissions/policies";
import { toECDSASigner } from "@zerodev/permissions/signers";
import {
  KernelAccountClient,
  addressToEmptyAccount,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  getUserOperationGasPrice,
} from "@zerodev/sdk";
import { KERNEL_V3_1, getEntryPoint } from "@zerodev/sdk/constants";
import axios from "axios";
import { Account, concat, createPublicClient, http, keccak256 } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, base } from "viem/chains";

import api from "@/utils/axios";
import { envVars } from "@/utils/envVars";

import { User, useUser } from "../../UserContext";

const useKernelClient = () => {
  const [kernelClient, setKernelClient] =
    React.useState<KernelAccountClient | null>(null);
  const [kernelAccount, setKernelAccount] = React.useState<Account>();
  const [ready, setReady] = React.useState(false);

  const { wallets } = useWallets();
  const { user, setUser } = useUser();

  const initializeKernelClient = async (
    wallet: ConnectedWallet,
    user: User
  ) => {
    console.log("Initializing Privy Zerodev Smart Account with sessions");
    const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${envVars.zeroDevId}`;
    const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${envVars.zeroDevId}?selfFunded=true`;
    // const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/9140f1f4-90c3-4a0f-8d92-62f700ac67a0?selfFunded=true`;

    const chain = base;
    const entryPoint = getEntryPoint("0.7");

    if (!wallet) return null;

    const provider = await wallet.getEthereumProvider();

    const sessionSigner = await toECDSASigner({
      // @ts-expect-error signer not typed correctly
      signer: provider,
    });

    // Creating Agent to sign transactions
    const agent_sessionPrivateKey = generatePrivateKey();

    const agent_SessionKeySigner = await toECDSASigner({
      signer: privateKeyToAccount(agent_sessionPrivateKey),
    });

    const agent_sessionKeyAddress = agent_SessionKeySigner.account.address;

    const publicClient = await createPublicClient({
      chain,
      transport: http(
        `https://base-mainnet.g.alchemy.com/v2/${envVars.alchemyApiKey}`
      ),
    });

    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      // @ts-expect-error signer not typed correctly
      signer: sessionSigner,
      entryPoint,
      kernelVersion: KERNEL_V3_1,
    });

    const emptyAccount = addressToEmptyAccount(agent_sessionKeyAddress);
    const emptySessionKeySigner = await toECDSASigner({ signer: emptyAccount });

    const permissionPlugin = await toPermissionValidator(publicClient, {
      signer: emptySessionKeySigner,
      entryPoint,
      policies: [toSudoPolicy({})],
      kernelVersion: KERNEL_V3_1,
    });

    const kernelAccount = await createKernelAccount(publicClient, {
      plugins: {
        sudo: ecdsaValidator,
        regular: permissionPlugin,
      },
      entryPoint,
      kernelVersion: KERNEL_V3_1,
    });

    const storedApproval = user?.sessionKeyString;

    const approval =
      storedApproval !== ""
        ? storedApproval
        : await serializePermissionAccount(kernelAccount);

    console.log({ approval });

    if (!storedApproval) {
      await api.put(`${envVars.apiEndpoint}/user/session-key`, {
        email: user.email,
        sessionKeyString: approval,
      });
    }

    if (user) {
      const savedUser = {
        email: user?.email,
        name: user?.name,
        address: user?.address,
        sessionKeyString: approval,
      };

      setUser(savedUser);
    }

    const sessionKeyAccount = await deserializePermissionAccount(
      publicClient,
      entryPoint,
      KERNEL_V3_1,
      approval,
      agent_SessionKeySigner
    );

    console.log({
      sessionKeyAccount: sessionKeyAccount.address,
      kernelAccount: kernelAccount.address,
      wallet: wallet.address,
    });

    const kernelClient = createKernelAccountClient({
      account: sessionKeyAccount,
      chain,
      bundlerTransport: http(BUNDLER_RPC),
      client: publicClient,
      paymaster: {
        getPaymasterData(userOperation: any) {
          const paymasterClient = createZeroDevPaymasterClient({
            chain,
            transport: http(PAYMASTER_RPC),
          });

          return paymasterClient.sponsorUserOperation({ userOperation });
        },
      },
      userOperation: {
        estimateFeesPerGas: async ({
          bundlerClient,
        }: {
          bundlerClient: any;
        }) => {
          return getUserOperationGasPrice(bundlerClient);
        },
      },
    });

    setKernelClient(kernelClient);
    setKernelAccount(kernelAccount);
    setReady(true);
  };

  useEffect(() => {
    if (wallets && user?.email) {
      const wallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );
      console.log("Found Wallet", { wallet });

      if (wallet) {
        initializeKernelClient(wallet, user);
      }
    }
  }, [wallets, user?.email]);

  return { ready, account: kernelAccount?.address, kernelClient };
};

export default useKernelClient;
