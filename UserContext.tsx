import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { formatUnits } from "viem";
import { arbitrum } from "viem/chains";
import { useAccount, useChainId, useReadContract, useSwitchChain } from "wagmi";

import useUSDCContract from "@/contracts/USDC";

export interface User {
  name: string;
  email: string;
  sessionKeyString: string;
  address: string;
  balance: number;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const USDC = useUSDCContract();

  const { switchChainAsync } = useSwitchChain();
  const account = useAccount();

  useEffect(() => {
    if (account.chainId !== arbitrum.id) {
      switchChainAsync({ chainId: arbitrum.id });
    }
  }, [account.chainId]);

  // useEffect(() => {
  //   if (userBalance && user?.address) {
  //     setUser({
  //       ...user,
  //       balance: Number(formatUnits(userBalance as bigint, 6)),
  //     });
  //   }
  // }, [user?.address, userBalance]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
