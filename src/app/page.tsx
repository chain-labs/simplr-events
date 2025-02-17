"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import {
  PiLinkedinLogoDuotone,
  PiRocketLaunchDuotone,
  PiShootingStarDuotone,
} from "react-icons/pi";

import Container from "@/components/component/container";
import HomeTicketCardComponent from "@/components/home/home-ticket-card-component";
import { Button } from "@/components/ui/button";
import { H2, H5 } from "@/components/ui/heading";
import { dummyOrders } from "@/utils/dummyData";

export default function Home() {
  const data = dummyOrders;
  const escrow = data.slice(0, 4);
  const selling = data.slice(0, 4);
  const devcon = data.slice(0, 4);
  const taipei = data.slice(0, 4);
  const SingleMyTicketRef = useRef<HTMLDivElement>(null);
  const [widthOfSingleMyTicket, setWidthOfSingleMyTicket] =
    useState<string>("0px");

  useLayoutEffect(() => {
    if (SingleMyTicketRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setWidthOfSingleMyTicket(SingleMyTicketRef.current?.offsetWidth + "px");
      });
      resizeObserver.observe(SingleMyTicketRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [SingleMyTicketRef]);

  const team = [
    {
      name: "Mihirsinh Parmar",
      image: "/images/mihirsinh-parmar.png",
      position: "Co-Founder & CEO",
      socials: {
        linkedin: "https://www.linkedin.com/in/mihirsinh-parmar-1b1b1b1b1/",
      },
    },
    {
      name: "Angel Larka",
      image: "/images/angel-larka.png",
      position: "Co-Founder & Senior Engineering Lead",
      socials: {
        linkedin: "https://www.linkedin.com/in/angel-larka-1b1b1b1b1/",
      },
    },
    {
      name: "Bapusaheb patil",
      image: "/images/bapusaheb-patil.png",
      position: "Co-Founder & Head of Design",
      socials: {
        linkedin: "https://www.linkedin.com/in/bapusaheb-patil-1b1b1b1b1/",
      },
    },
    {
      name: "Anirudh Akella",
      image: "/images/anirudh-akella.png",
      position: "Co-Founder & Head of Marketing",
      socials: {
        linkedin: "https://www.linkedin.com/in/anirudh-akella-1b1b1b1b1/",
      },
    },
  ];
  return (
    <div className="my-[16px] w-full px-[16px] md:mx-auto md:my-[50px] xl:px-0">
      {/* <div className="ml-auto flex w-full max-w-[calc(((100vw-1200px)/2)+1200px)] flex-col gap-[32px] overflow-hidden md:grid md:grid-cols-[auto_auto]"> */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[32px] md:grid md:grid-cols-[auto_auto]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex w-full max-w-[1280px] gap-[16px]">
            {/* my tickets header */}
            <div
              style={{ minWidth: widthOfSingleMyTicket }}
              className="flex items-center justify-between"
            >
              <H2 className="text-simpleWhite">My Tickets</H2>
              <Button variant="tertiary" size="sm" className="hidden md:block">
                View All
              </Button>
            </div>
            {/* escrow header*/}
            <div className="hidden w-full items-center justify-between md:flex">
              <H2 className="text-simpleWhite">Tickets in Escrow</H2>
              <Button variant="tertiary" size="sm" className="hidden md:block">
                View All
              </Button>
            </div>
          </div>

          <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[32px] overflow-x-auto md:flex-row md:gap-[16px]">
            <div className="flex flex-col gap-[16px] md:w-fit">
              <div className="w-full xl:w-fit" ref={SingleMyTicketRef}>
                <HomeTicketCardComponent order={data[0]} />
              </div>
              <Button variant="tertiary" size="sm" className="block md:hidden">
                View All
              </Button>
            </div>

            <div className="flex w-full flex-col gap-[16px] overflow-x-auto md:pb-[5px]">
              <H2 className="text-simpleWhite md:hidden">Tickets in Escrow</H2>
              <div className="flex flex-col gap-[16px] md:flex-row">
                {escrow.map((order, index) => (
                  <HomeTicketCardComponent
                    key={index}
                    order={order}
                    bgGradient="yellow"
                  />
                ))}
              </div>
              <Button variant="tertiary" size="sm" className="block md:hidden">
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[16px]"></div>

        {/* tickets im selling */}
        <div className="flex w-full flex-col gap-[16px] md:col-span-2">
          <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
            <H2 className="text-simpleWhite">Tickets I'm selling</H2>
            <Button variant="tertiary" size="sm" className="hidden md:block">
              View All
            </Button>
          </div>
          <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
            {selling.map((order, index) => (
              <HomeTicketCardComponent
                key={index}
                order={order}
                bgGradient="pink"
              />
            ))}
            <Button variant="tertiary" size="sm" className="block md:hidden">
              View All
            </Button>
          </div>
        </div>

        <div className="h-[8px] w-screen translate-x-[-16px] bg-simpleYellow md:h-[24px] md:translate-x-[calc(-1*min(100%,(100vw-1280px)/2))]"></div>

        <div className="flex w-full gap-[12px] py-[16px] md:col-span-2">
          <a
            href="#devcon"
            className="rounded-[16px] bg-simpleBlack/25 p-[12px] shadow-[inset_0px_-2px_0px_#F2FF49]"
          >
            <H2 className="flex gap-[8px] text-simpleYellow">
              <PiShootingStarDuotone size={48} /> DevCon 2024
            </H2>
          </a>
          <a href="#taipei" className="rounded-[16px] p-[12px]">
            <H2 className="flex gap-[8px] text-simpleWhite">
              <PiRocketLaunchDuotone size={48} /> Taipei 2024
            </H2>
          </a>
        </div>

        {/* devcon 2024 */}
        <div
          id="devcon"
          className="flex w-full flex-col gap-[16px] md:col-span-2"
        >
          <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
            <H2 className="flex gap-[8px] text-simpleWhite">
              <PiShootingStarDuotone size={48} /> DevCon 2024
            </H2>
            <Button variant="tertiary" size="sm" className="hidden md:block">
              View All
            </Button>
          </div>
          <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
            {devcon.map((order, index) => (
              <HomeTicketCardComponent key={index} order={order} />
            ))}
            <Button variant="tertiary" size="sm" className="block md:hidden">
              View All
            </Button>
          </div>
        </div>

        {/* taipei 2024 */}
        <div
          id="taipei"
          className="flex w-full flex-col gap-[16px] md:col-span-2"
        >
          <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
            <H2 className="flex gap-[8px] text-simpleWhite">
              <PiRocketLaunchDuotone size={48} /> Taipei 2024
            </H2>
            <Button variant="tertiary" size="sm" className="hidden md:block">
              View All
            </Button>
          </div>
          <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
            {taipei.map((order, index) => (
              <HomeTicketCardComponent key={index} order={order} />
            ))}
            <Button variant="tertiary" size="sm" className="block md:hidden">
              View All
            </Button>
          </div>
        </div>

        {/* meet the team */}
        <div className="col-span-2 flex w-full max-w-[min(1280px,100%)] flex-col gap-[16px] overflow-hidden">
          <div className="flex w-full items-center justify-between">
            <H2 className="text-simpleWhite">Meet The Team</H2>
          </div>
          <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
            {team.map((member, index) => (
              <Container
                key={member.name}
                className="md:full m-0 flex h-full w-full flex-grow flex-col items-start justify-start gap-[16px] p-[32px] md:mx-0 md:p-[32px]"
                parentClassName="flex justify-start items-start w-full"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-square h-[96px] w-[96px] rounded-full"
                />
                <H5>{member.name}</H5>
                <p className="text-[14px] font-medium leading-[20px] text-simpleGray700">
                  {member.position}
                </p>
                <Link href={member.socials.linkedin} className="w-fit">
                  <PiLinkedinLogoDuotone
                    className="text-simpleBlue"
                    size={24}
                  />
                </Link>
              </Container>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
