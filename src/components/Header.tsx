"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { usePrivy } from "@privy-io/react-auth";
import {
  PiCaretDown,
  PiHouseDuotone,
  PiListDuotone,
  PiWalletDuotone,
  PiXDuotone,
} from "react-icons/pi";
import { createWalletClient, custom, formatUnits } from "viem";
import { useAccount, useConfig, useDisconnect, usePublicClient } from "wagmi";

import useUSDCContract from "@/contracts/USDC";
import api from "@/utils/axios";
import { cn } from "@/utils/cn";

import { useUser } from "../../UserContext";
import EmailNameModal from "./email-name-modal";
import { Button } from "./ui/button";
import { LabelSmall } from "./ui/label";
import { PMedium } from "./ui/paragraph";

export default function Header() {
  const [openEmailNameModal, setOpenEmailNameModal] = useState(false);
  const [pendingAddress, setPendingAddress] = useState<string | undefined>();
  const [walletModelOpen, setWalletModelOpen] = useState(false);
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const MobileMenuRef = useRef<HTMLDivElement>(null);
  const WalletModelRef = useRef<HTMLDivElement>(null);
  const MobileWalletModelRef = useRef<HTMLDivElement>(null);
  const Links = [
    { name: "home", href: "/" },
    { name: "link your ticket", href: "/link-your-ticket", auth: true },
    { name: "buy", href: "/buy-ticket" },
    { name: "sell", href: "/sell-your-ticket" },
  ];

  const privy = usePrivy();
  const { user, setUser } = useUser();
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const client = usePublicClient();

  const USDC = useUSDCContract();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // try {
    //   await privy.login();
    //   // save user to db
    //   // const response = await axios.post(`${envVars.apiEndpoint}/user/create`, {})
    // } catch (error) {
    //   console.error("Error while logging in", error);
    // }

    try {
      if (typeof window.ethereum !== "undefined") {
        const [address] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const client = createWalletClient({
          transport: custom(window.ethereum),
        });
        console.log("Wallet connected:", address);
        return client;
      } else {
        console.log("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error while connecting wallet", error);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // try {
    //   await privy.logout();
    // } catch (error) {
    //   console.error("Error while logging out", error);
    // }

    try {
      disconnect();
    } catch (error) {
      console.error("Error while disconnecting wallet", error);
    }
  };

  // Handle modal submission
  const handleModalSubmit = async (data: { name: string; email: string }) => {
    try {
      if (pendingAddress) {
        const response = await api.post("/user/create", {
          name: data.name,
          email: data.email,
          address: pendingAddress,
        });

        const { data: responseData } = response;
        const { _id, __v, ...userData } = responseData.user;

        // Get USDC balance
        const balance = await client?.readContract({
          address: USDC.address,
          abi: USDC.abi,
          functionName: "balanceOf",
          args: [userData?.address ?? ""],
        });

        setUser({ ...userData, balance: formatUnits(balance as bigint, 6) });
        setOpenEmailNameModal(false);
        setPendingAddress(undefined);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      account.address &&
      USDC.address !== "0x"
    ) {
      console.log({ account });

      // Get user from DB
      api.get(`/user/${account.address}`).then((response) => {
        console.log({ userData: response });

        if (response.data) {
          // User found in database - set user data
          const { data } = response;
          const { _id, __v, ...user } = data;

          client
            ?.readContract({
              address: USDC.address,
              abi: USDC.abi,
              functionName: "balanceOf",
              args: [user?.address ?? ""],
            })
            .then((data) => {
              setUser({ ...user, balance: formatUnits(data as bigint, 6) });
            });
        } else {
          // User not found - show modal instead of prompt
          setPendingAddress(account.address);
          setOpenEmailNameModal(true);
        }
      });
    }
  }, [account.address, USDC.address]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        MobileMenuRef.current &&
        !MobileMenuRef.current.contains(e.target as Node)
      ) {
        setHamMenuOpen(false);
      }
      if (
        WalletModelRef.current &&
        !WalletModelRef.current.contains(e.target as Node)
      ) {
        setWalletModelOpen(false);
      }
      if (
        MobileWalletModelRef.current &&
        !MobileWalletModelRef.current.contains(e.target as Node)
      ) {
        setWalletModelOpen(false);
      }
    };

    if (hamMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else if (walletModelOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hamMenuOpen, walletModelOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 h-fit w-full bg-simpleBlue p-[8px] pb-[32px] md:px-[32px] md:py-[16px]">
        <nav className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between">
          <Link href="/">
            <Image
              src="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/png/simplr-yellow.png?updatedAt=1734096538221"
              alt="logo"
              width={100}
              height={100}
              className="h-[32px] w-auto"
            />
          </Link>
          {/* desktop */}
          <>
            <ul className="hidden gap-[10px] md:flex">
              {Links.map((link) => {
                return (
                  (link.auth ? link.auth && account.address : true) && (
                    <li
                      key={link.href}
                      className="inline-block text-sm font-semibold text-[#333] transition-colors duration-300 hover:text-[#000]"
                    >
                      <Link href={link.href}>
                        <Button variant="ghost" size="sm">
                          {link.name}
                        </Button>
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
            {account.address && (
              <div className="relative hidden md:block">
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-[4px] bg-[transparent] text-[16px] leading-[20.8px] tracking-[0.02em]"
                  onClick={
                    walletModelOpen
                      ? () => setWalletModelOpen(false)
                      : () => setWalletModelOpen(true)
                  }
                >
                  <PiWalletDuotone size={24} />${user?.balance}
                  {
                    <PiCaretDown
                      size={16}
                      className={cn(
                        "transform transition-transform duration-300",
                        walletModelOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  }
                </Button>
                {walletModelOpen && (
                  <div
                    ref={WalletModelRef}
                    className="absolute left-0 top-full flex flex-col items-center justify-center gap-[16px] rounded-[24px] bg-[#FFFFFF03] bg-simpleWhite p-[16px] shadow-[inset_2px_4px_4px_#FAFFD3BF,_inset_-2px_-4px_4px_#63680040,_inset_0_0_0_2px_#ffffff]"
                  >
                    <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
                      <LabelSmall>Your Email:</LabelSmall>
                      <PMedium className="text-[16px] font-bold leading-[26px] tracking-[0.02em]">
                        {user?.email}
                      </PMedium>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
                      <LabelSmall>Your wallet Balance:</LabelSmall>
                      <PMedium className="text-[20px] font-bold leading-[26px] tracking-[0.02em]">
                        ${user?.balance}
                      </PMedium>
                    </div>
                    <Button variant="primary" size="sm">
                      withdraw balance
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div className="hidden items-center justify-center gap-2 md:flex">
              <Button variant="outline" size="sm">
                contact us
              </Button>
              {account.address ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  log out
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleLogin}>
                  sign in
                </Button>
              )}
            </div>
          </>

          {/* Mobile */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            {!account.address ? (
              <Button
                variant="primary"
                size="lg"
                className="flex h-[48px] items-center justify-center"
              >
                sign in
              </Button>
            ) : (
              <Link href="/">
                <Button className="grid h-[48px] w-[48px] place-items-center rounded-full p-0">
                  <PiHouseDuotone size={24} />
                </Button>
              </Link>
            )}
            <Button
              onClick={() => setHamMenuOpen(!hamMenuOpen)}
              className="grid h-[48px] w-[48px] place-items-center rounded-full p-0"
            >
              {hamMenuOpen ? (
                <PiXDuotone size={24} />
              ) : (
                <PiListDuotone size={24} />
              )}
            </Button>
          </div>

          {hamMenuOpen && (
            <div
              ref={MobileMenuRef}
              className="absolute top-full mt-[8px] block w-full rounded-[24px] bg-simpleYellow p-[16px] md:hidden"
            >
              <ul className="flex flex-col gap-[8px]">
                {Links.map((link) => (
                  <li key={link.href}>
                    <Button
                      variant="tertiary-dark"
                      size="sm"
                      className="w-full cursor-auto"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
                  </li>
                ))}

                {account.address && (
                  <>
                    <div className="h-[1px] w-full bg-simpleBlack opacity-25"></div>
                    <div className="md:hidden">
                      <Button
                        variant="tertiary-dark"
                        className="relative mx-auto flex w-fit items-center gap-[4px] bg-[transparent] text-[16px] leading-[20.8px] tracking-[0.02em]"
                        onClick={
                          walletModelOpen
                            ? () => setWalletModelOpen(false)
                            : () => setWalletModelOpen(true)
                        }
                      >
                        <PiWalletDuotone size={24} />
                        {"1 USD"}
                        {
                          <PiCaretDown
                            size={16}
                            className={cn(
                              "transform transition-transform duration-300",
                              walletModelOpen ? "rotate-180" : "rotate-0"
                            )}
                          />
                        }
                      </Button>
                      {walletModelOpen && (
                        <div
                          ref={MobileWalletModelRef}
                          className="flex flex-col items-center justify-center gap-[16px] rounded-[24px] bg-[#FFFFFF03] bg-simpleWhite p-[16px] shadow-[inset_2px_4px_4px_#FAFFD3BF,_inset_-2px_-4px_4px_#63680040,_inset_0_0_0_2px_#ffffff]"
                        >
                          <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
                            <LabelSmall>Your Email:</LabelSmall>
                            <PMedium className="text-[16px] font-bold leading-[26px] tracking-[0.02em]">
                              {privy.user?.email?.address}
                            </PMedium>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
                            <LabelSmall>Your wallet Balance:</LabelSmall>
                            <PMedium className="text-[20px] font-bold leading-[26px] tracking-[0.02em]">
                              {"1 USD"}
                            </PMedium>
                          </div>
                          <Button variant="primary" size="sm">
                            withdraw balance
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="h-[1px] w-full bg-simpleBlack opacity-25"></div>
                  </>
                )}

                <li className="flex items-center justify-center gap-[8px]">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full cursor-auto"
                  >
                    contact us
                  </Button>
                  {account.address && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full cursor-auto"
                    >
                      log out
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>
      {/* Add EmailNameModal component */}
      <EmailNameModal
        isOpen={openEmailNameModal}
        onClose={() => {
          setOpenEmailNameModal(false);
          // If user closes without submitting, we should disconnect
          if (pendingAddress) {
            disconnect();
            setPendingAddress(undefined);
          }
        }}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
