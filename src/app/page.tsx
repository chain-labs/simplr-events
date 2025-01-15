"use client";

import Link from "next/link";

import { PiLinkedinLogoDuotone } from "react-icons/pi";
import SimpleBar from "simplebar-react";

import Container from "@/components/component/container";
import HomeTicketCardComponent from "@/components/home/home-ticket-card-component";
import { Button } from "@/components/ui/button";
import { H2, H4, H5 } from "@/components/ui/heading";
import { dummyTickets } from "@/utils/dummyData";

export default function Home() {
  const data = dummyTickets;
  const escrow = data.slice(0, 4);
  const selling = data.slice(0, 4);
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
    <div className="my-[16px] w-full px-[16px] md:mx-auto md:my-[50px] md:px-0">
      {/* <div className="ml-auto flex w-full max-w-[calc(((100vw-1200px)/2)+1200px)] flex-col gap-[32px] overflow-hidden md:grid md:grid-cols-[auto_auto]"> */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[32px] md:grid md:grid-cols-[auto_auto]">
        <div className="col-span-2 grid w-full max-w-[1280px] grid-cols-[auto_auto] gap-[16px] bg-black">
          {/* my tickets */}
          <div className="flex w-auto flex-col gap-[16px] md:w-fit">
            <div className="flex w-full items-center justify-between">
              <H2 className="text-simpleWhite">My Tickets</H2>
              <Button variant="ghost" size="sm" className="hidden md:block">
                View All
              </Button>
            </div>
            <div className="w-full md:w-fit">
              <HomeTicketCardComponent ticket={data[0]} />
            </div>
            <Button variant="tertiary" size="sm" className="block md:hidden">
              View All
            </Button>
          </div>

          {/* escrow */}
          <div className="flex flex-col gap-[16px] bg-slate-500">
            <div className="flex items-center justify-between">
              <H2 className="text-simpleWhite">Tickets in Escrow</H2>
              <Button variant="ghost" size="sm" className="hidden md:block">
                View All
              </Button>
            </div>
            <SimpleBar>
              {({ scrollableNodeRef, contentNodeRef }) => {
                // Now you have access to scrollable and content nodes
                return (<div></div>) as JSX.Element;
              }}
              <Button variant="tertiary" size="sm" className="block md:hidden">
                View All
              </Button>
            </SimpleBar>
          </div>
        </div>

        {/* tickets im selling */}
        <div className="flex w-full flex-col gap-[16px] md:col-span-2">
          <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
            <H2 className="text-simpleWhite">Tickets I'm selling</H2>
            <Button variant="ghost" size="sm" className="hidden md:block">
              View All
            </Button>
          </div>
          <div className="flex w-full flex-col gap-[16px] md:flex-row">
            {selling.map((ticket, index) => (
              <HomeTicketCardComponent
                key={index}
                ticket={ticket}
                bgGradient="pink"
              />
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
          <div className="flex flex-col gap-[16px] overflow-x-auto md:flex-row md:justify-between">
            {team.map((member, index) => (
              <Container
                key={member.name}
                className="md:full m-0 flex h-full w-full flex-grow-0 flex-col items-start justify-start gap-[16px] p-[32px] md:mx-0 md:p-[32px]"
                parentClassName="flex justify-start items-start"
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
                  {/* @ts-expect-error */}
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
