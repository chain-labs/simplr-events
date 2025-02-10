"use client";

import React from "react";

import { PrivyProvider } from "@privy-io/react-auth";
import { arbitrum, arbitrumSepolia, base, sepolia } from "viem/chains";

import { envVars } from "@/utils/envVars";
import { logo_faces, theme } from "@/utils/theme";

interface Props {
  children: React.ReactNode;
}

const Privy = ({ children }: Props) => {
  return (
    <PrivyProvider
      appId={envVars.privyAppId}
      config={{
        /* Replace this with your desired login methods */
        loginMethods: ["email", "wallet", "google"],
        /* Replace this with your desired appearance configuration */
        appearance: {
          theme: "light",
          accentColor: `${theme.colors.brandBlue}` as `#${string}`,
          logo: logo_faces.png.blue,
        },
        supportedChains: [base],
        defaultChain: base,
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Privy;
