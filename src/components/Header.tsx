"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  PiCaretDown,
  PiHouseDuotone,
  PiListDuotone,
  PiWalletDuotone,
  PiXDuotone,
} from "react-icons/pi";

import { cn } from "@/utils/cn";

import { Button } from "./ui/button";
import { LabelSmall } from "./ui/label";
import { PMedium } from "./ui/paragraph";

export default function Header() {
  const [walletModelOpen, setWalletModelOpen] = useState(false);
  const [hamMenuOpen, setHamMenuOpen] = useState(false);
  const MobileMenuRef = useRef<HTMLDivElement>(null);
  const WalletModelRef = useRef<HTMLDivElement>(null);
  const MobileWalletModelRef = useRef<HTMLDivElement>(null);
  const Links = [
    { name: "home", href: "/" },
    { name: "link your ticket", href: "/link-your-ticket" },
    { name: "buy", href: "/buy-ticket" },
    { name: "sell", href: "/sell-your-ticket" },
  ];

  const account = {
    isConnected: true,
    wallet: "$250,000.0000",
    email: "testtesttesttesttest@example.com",
  };

  useEffect(() => {
    let handleClickOutside = (e: any) => {
      if (MobileMenuRef.current && !MobileMenuRef.current.contains(e.target)) {
        setHamMenuOpen(false);
      }
      if (
        WalletModelRef.current &&
        !WalletModelRef.current.contains(e.target)
      ) {
        setWalletModelOpen(false);
      }
      if (
        MobileWalletModelRef.current &&
        !MobileWalletModelRef.current.contains(e.target)
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
    <header className="sticky top-0 z-50 h-fit w-full bg-simpleBlue p-[8px] pb-[32px] md:px-[32px] md:py-[16px]">
      <nav className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <div>
          <Image
            src="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/png/simplr-yellow.png?updatedAt=1734096538221"
            alt="logo"
            width={100}
            height={100}
            className="h-[32px] w-auto"
          />
        </div>
        {/* desktop */}
        <>
          <ul className="hidden gap-[10px] md:flex">
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
                {/* @ts-expect-error */}
                <PiWalletDuotone size={24} />
                {account.wallet}
                {
                  // @ts-expect-error
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
                      {account.email}
                    </PMedium>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
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
          <div className="hidden items-center justify-center gap-2 md:flex">
            <Button variant="outline" size="sm">
              contact us
            </Button>
            {account.isConnected ? (
              <Button variant="outline" size="sm">
                log out
              </Button>
            ) : (
              <Button variant="primary" size="sm">
                sign in
              </Button>
            )}
          </div>
        </>

        {/* Mobile */}
        <div className="flex items-center justify-center gap-2 md:hidden">
          {!account.isConnected ? (
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
                {/* @ts-expect-error */}
                <PiHouseDuotone size={24} />
              </Button>
            </Link>
          )}
          <Button
            onClick={() => setHamMenuOpen(!hamMenuOpen)}
            className="grid h-[48px] w-[48px] place-items-center rounded-full p-0"
          >
            {hamMenuOpen ? (
              // @ts-expect-error
              <PiXDuotone size={24} />
            ) : (
              // @ts-expect-error
              <PiListDuotone size={24} />
            )}
          </Button>
        </div>

        {hamMenuOpen && (
          <div
            ref={MobileMenuRef}
            className="absolute top-full mt-[8px] block w-full rounded-[24px] bg-simpleYellow p-[16px] md:hidden"
          >
            <ol className="flex flex-col gap-[8px]">
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

              {account.isConnected && (
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
                      {/* @ts-expect-error */}
                      <PiWalletDuotone size={24} />
                      {account.wallet}
                      {
                        // @ts-expect-error
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
                            {account.email}
                          </PMedium>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[8px] whitespace-nowrap text-left text-simpleGray700">
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
                {account.isConnected && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full cursor-auto"
                  >
                    log out
                  </Button>
                )}
              </li>
            </ol>
          </div>
        )}
      </nav>
    </header>
  );
}
