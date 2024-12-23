"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

export default function Header() {
  const Links = [
    { name: "home", href: "/" },
    { name: "link your ticket", href: "/link-your-ticket" },
    { name: "buy", href: "/buy" },
    { name: "sell", href: "/sell-your-ticket" },
  ];

  return (
    <header className="sticky top-0 mx-auto h-fit w-full max-w-[1280px] bg-simpleBlue px-[32px] py-[16px]">
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
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            contact us
          </Button>
          <Button variant="outline" size="sm">
            log out
          </Button>
        </div>
      </nav>
    </header>
  );
}
