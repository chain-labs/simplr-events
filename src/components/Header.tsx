"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { usePrivy } from "@privy-io/react-auth";
import { PiCaretDown, PiWalletDuotone } from "react-icons/pi";

import { cn } from "@/utils/cn";

import { Button } from "./ui/button";
import { LabelSmall } from "./ui/label";
import { PMedium } from "./ui/paragraph";

export default function Header() {
  const [walletModelOpen, setWalletModelOpen] = useState(false);
  const Links = [
    { name: "home", href: "/" },
    { name: "link your ticket", href: "/link-your-ticket" },
    { name: "buy", href: "/buy-ticket" },
    { name: "sell", href: "/sell-your-ticket" },
  ];

  const account = {
    isConnected: true,
    wallet: "$250,000.0000",
  };

  const { authenticated, connectOrCreateWallet, logout } = usePrivy();

  return (
    <header className="sticky top-0 z-50 mx-auto h-fit w-full max-w-[1280px] bg-simpleBlue px-[32px] py-[16px]">
      <nav className="flex w-full items-center justify-between">
        <div>
          <Image
            src="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/png/simplr-yellow.png?updatedAt=1734096538221"
            alt="logo"
            width={100}
            height={100}
            className="h-[32px] w-auto"
          />
        </div>
        <ul className="flex gap-[10px]">
          {Links.map((link) => (
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
          ))}
        </ul>
        {account.isConnected && (
          <div className="relative">
            <Button
              variant="ghost"
              className="relative flex items-center gap-[4px] bg-[transparent] text-[16px] leading-[20.8px] tracking-[0.02em]"
              onClick={
                walletModelOpen
                  ? () => setWalletModelOpen(false)
                  : () => setWalletModelOpen(true)
              }
            >
              <PiWalletDuotone size={24} />
              {account.wallet}
              <PiCaretDown
                size={16}
                className={cn(
                  "transform transition-transform duration-300",
                  walletModelOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </Button>
            {walletModelOpen && (
              <div className="absolute left-1/2 top-full flex -translate-x-1/2 flex-col items-center justify-center gap-[16px] rounded-[24px] bg-[#FFFFFF03] bg-simpleWhite p-[16px] shadow-[inset_2px_4px_4px_#FAFFD3BF,_inset_-2px_-4px_4px_#63680040,_inset_0_0_0_2px_#ffffff]">
                <div className="flex flex-col gap-[8px] whitespace-nowrap text-left text-simpleGray700">
                  <LabelSmall>Your wallet Balance:</LabelSmall>
                  <PMedium className="text-[20px] font-bold leading-[26px] tracking-[0.02em]">
                    {account.wallet}
                  </PMedium>
                </div>
                <Button variant="primary" size="sm">
                  withdraw balance
                </Button>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            contact us
          </Button>
          {authenticated ? (
            <Button variant="outline" size="sm" onClick={() => logout()}>
              log out
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => connectOrCreateWallet()}
            >
              sign in
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
