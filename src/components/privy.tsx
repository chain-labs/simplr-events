"use client";

import React from "react";

import { PrivyProvider } from "@privy-io/react-auth";
import { arbitrumSepolia } from "viem/chains";

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
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: theme.colors.brandBlue,
          logo: logo_faces.png.blue,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        supportedChains: [arbitrumSepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Privy;
