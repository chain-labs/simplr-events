"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { PiLinkedinLogoDuotone, PiShootingStarDuotone } from "react-icons/pi";

import Container from "@/components/component/container";
import HomeTicketCardComponent, {
  HomeEmptyState,
  HomeTicketCardSkeleton,
} from "@/components/home/home-ticket-card-component";
import useHomeData, {
  MarketplaceDataResponse,
} from "@/components/home/useHomeData";
import { Button } from "@/components/ui/button";
import { H2, H5 } from "@/components/ui/heading";

export default function Home() {
  const { totalData, isLoading } = useHomeData();
  const SingleMyTicketRef = useRef<HTMLDivElement>(null);
  const [widthOfSingleMyTicket, setWidthOfSingleMyTicket] =
    useState<string>("0px");

  useLayoutEffect(() => {
    if (SingleMyTicketRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setWidthOfSingleMyTicket(`${SingleMyTicketRef.current?.offsetWidth}px`);
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
      name: "Angel Lakra",
      image: "/images/angel-larka.png",
      position: "Co-Founder & Senior Engineering Lead",
      socials: {
        linkedin: "https://www.linkedin.com/in/angel-lakra-1b1b1b1b1/",
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

  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const handleViewAll = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Animation variants
  const containerVariants = {
    grid: {
      gridTemplateColumns: "auto auto",
      gap: "32px",
    },
    expanded: {
      gridTemplateColumns: "1fr",
      gap: "32px",
    },
  };

  const sectionVariants = {
    visible: {
      opacity: 1,
      height: "fit-content",
      maxWidth: "1280px",
      width: "auto",
      transition: { duration: 0.3 },
    },
    hidden: {
      opacity: 0,
      height: 0,
      width: 0,
      transition: { duration: 0.3 },
    },
  };
  useEffect(() => {
    console.log({ totalData, isLoading });
  }, [isLoading, totalData]);

  const data: MarketplaceDataResponse = useMemo(() => {
    if (totalData) {
      return JSON.parse(totalData);
    }

    return {};
  }, [totalData]);

  return (
    <div className="my-[16px] w-full px-[16px] md:mx-auto md:my-[50px] xl:px-0">
      {/* <div className="ml-auto flex w-full max-w-[calc(((100vw-1200px)/2)+1200px)] flex-col gap-[32px] overflow-hidden md:grid md:grid-cols-[auto_auto]"> */}
      <motion.div
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-[32px] md:grid"
        variants={containerVariants}
        animate={expandedSection ? "expanded" : "default"}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          <motion.div className="flex flex-col gap-[16px]">
            <motion.div className="flex w-full max-w-[1280px] gap-[16px]">
              {/* my tickets header */}
              <motion.div
                className="flex items-center justify-between"
                variants={{
                  ...sectionVariants,
                  visible: {
                    ...sectionVariants.visible,
                    width: widthOfSingleMyTicket,
                    minWidth:
                      expandedSection === "myTickets"
                        ? "100%"
                        : widthOfSingleMyTicket,
                  },
                }}
                animate={
                  expandedSection === "myTickets"
                    ? "visible"
                    : expandedSection
                      ? "hidden"
                      : "visible"
                }
              >
                <H2 className="text-simpleWhite">My Tickets</H2>
                {!!data?.userTickets?.owned.length && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="hidden md:block"
                    onClick={() => handleViewAll("myTickets")}
                  >
                    {expandedSection === "myTickets" ? "Close" : "View All"}
                  </Button>
                )}
              </motion.div>
              {/* escrow header*/}
              <motion.div
                className="hidden w-full items-center justify-between md:flex"
                variants={sectionVariants}
                animate={
                  expandedSection === "escrow"
                    ? "visible"
                    : expandedSection
                      ? "hidden"
                      : "visible"
                }
              >
                <H2 className="text-simpleWhite">Tickets in Escrow</H2>
                {(data?.userTickets?.escrow ?? []).length > 4 && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="hidden md:block"
                    onClick={() => handleViewAll("escrow")}
                  >
                    {expandedSection === "escrow" ? "Close" : "View All"}
                  </Button>
                )}
              </motion.div>
            </motion.div>

            <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[32px] overflow-x-auto md:flex-row md:gap-[16px]">
              <motion.div
                className="flex flex-col gap-[16px] md:w-fit"
                variants={sectionVariants}
                animate={
                  expandedSection === "myTickets"
                    ? "visible"
                    : expandedSection
                      ? "hidden"
                      : "visible"
                }
              >
                <div className="w-full xl:w-fit" ref={SingleMyTicketRef}>
                  {!isLoading ? (
                    data?.userTickets?.owned?.length ? (
                      [...(data.userTickets.owned ?? [])]
                        .splice(
                          0,
                          expandedSection === "myTickets"
                            ? data?.userTickets?.owned?.length
                            : 1
                        )
                        .map((order, index) => (
                          <HomeTicketCardComponent
                            key={index}
                            order={{
                              ...order,
                              ticket: {
                                ...order.ticket,
                                event: data?.eventMap?.[order.ticket.event],
                              },
                            }}
                            isLoading={isLoading}
                          />
                        ))
                    ) : (
                      <HomeEmptyState
                        title="No tickets found"
                        redirectLink="/link-your-ticket"
                        linkText="Link your Ticket"
                      />
                    )
                  ) : (
                    [{}].map((_, index) => (
                      <HomeTicketCardSkeleton key={index} />
                    ))
                  )}
                </div>
                {!!data?.userTickets?.owned.length && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="block md:hidden"
                  >
                    View All
                  </Button>
                )}
              </motion.div>

              <motion.div
                className="flex w-full flex-col gap-[16px] overflow-x-auto md:pb-[5px]"
                variants={sectionVariants}
                animate={
                  expandedSection === "escrow"
                    ? "visible"
                    : expandedSection
                      ? "hidden"
                      : "visible"
                }
              >
                <H2 className="text-simpleWhite md:hidden">
                  Tickets in Escrow
                </H2>
                <div className="flex flex-col gap-[16px] md:flex-row">
                  {!isLoading ? (
                    data?.userTickets?.escrow?.length ? (
                      [...(data.userTickets.escrow ?? [])]
                        .splice(
                          0,
                          expandedSection === "escrow"
                            ? data?.userTickets?.escrow?.length
                            : 4
                        )
                        .map((order, index) => (
                          <HomeTicketCardComponent
                            key={index}
                            order={{
                              ...order,
                              ticket: {
                                ...order.ticket,
                                event: data?.eventMap?.[order.ticket.event],
                              },
                            }}
                            bgGradient="yellow"
                          />
                        ))
                    ) : (
                      <HomeEmptyState
                        title="No escrow tickets found"
                        redirectLink="/buy-ticket"
                        linkText="Buy a Ticket"
                      />
                    )
                  ) : (
                    [{}, {}, {}].map((_, index) => (
                      <HomeTicketCardSkeleton key={index} />
                    ))
                  )}
                </div>
                {(data?.userTickets?.escrow ?? []).length > 4 && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="block md:hidden"
                  >
                    View All
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex w-full flex-col gap-[16px]"></div>

        {/* tickets im selling */}
        <AnimatePresence>
          <motion.div
            className="flex w-full flex-col gap-[16px] md:col-span-2"
            variants={sectionVariants}
            animate={
              expandedSection === "sellingTickets"
                ? "visible"
                : expandedSection
                  ? "hidden"
                  : "visible"
            }
          >
            <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
              <H2 className="text-simpleWhite">Tickets I&apos;m selling</H2>
              {(data?.userTickets?.selling ?? []).length > 4 && (
                <Button
                  variant="tertiary"
                  size="sm"
                  className="hidden md:block"
                >
                  View All
                </Button>
              )}
            </div>
            <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
              {!isLoading ? (
                data?.userTickets?.selling?.length ? (
                  [...(data.userTickets.selling ?? [])].map((order, index) => (
                    <HomeTicketCardComponent
                      key={index}
                      order={{
                        ...order,
                        ticket: {
                          ...order.ticket,
                          event: data?.eventMap?.[order.ticket.event],
                        },
                      }}
                      bgGradient="pink"
                    />
                  ))
                ) : (
                  <HomeEmptyState
                    title="No tickets to sell"
                    redirectLink="/sell-your-ticket"
                    linkText="Sell your Ticket"
                  />
                )
              ) : (
                [{}, {}, {}].map((_, index) => (
                  <HomeTicketCardSkeleton key={index} />
                ))
              )}
              {(data?.userTickets?.selling ?? []).length > 4 && (
                <Button
                  variant="tertiary"
                  size="sm"
                  className="block md:hidden"
                >
                  View All
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="h-[8px] w-screen translate-x-[-16px] bg-simpleYellow md:h-[24px] md:translate-x-[calc(-1*min(100%,(100vw-1280px)/2))]"></div>

        <div className="flex w-full gap-[12px] py-[16px] md:col-span-2">
          {Object.keys(data?.marketplaceTickets ?? []).map((event) => (
            <a
              key={event}
              href={`#${event}`}
              className="rounded-[16px] bg-simpleBlack/25 p-[12px] shadow-[inset_0px_-2px_0px_#F2FF49]"
            >
              <H2 className="flex gap-[8px] text-simpleYellow">
                <PiShootingStarDuotone size={48} />{" "}
                {data?.eventMap?.[event].eventName ?? "Event 1"}
              </H2>
            </a>
          ))}
        </div>

        {Object.keys(data?.marketplaceTickets ?? []).map((event) => (
          <div
            key={event}
            id={event}
            className="relative xl:ml-[calc(-1*min(100%,(100vw-1280px)/2))] flex w-full flex-col gap-[16px] pl-[calc(min(100%,(100vw-1280px)/2))] md:col-span-2"
          >
            <div className="flex w-full max-w-[min(1280px,100%)] items-center justify-between">
              <H2 className="flex gap-[8px] text-simpleWhite">
                <PiShootingStarDuotone size={48} />{" "}
                {data?.eventMap?.[event].eventName ?? "Event 1"}
              </H2>
              {(data?.marketplaceTickets[event] ?? []).length > 4 && (
                <Button
                  variant="tertiary"
                  size="sm"
                  className="hidden md:block"
                >
                  View All
                </Button>
              )}
            </div>
            <div className="flex w-full max-w-[min(calc(((100vw-1280px)/2)+1280px),100%)] flex-col gap-[16px] overflow-x-auto md:flex-row md:pb-[5px]">
              {[...(data?.marketplaceTickets?.[event] ?? [])]
                .splice(
                  0,
                  expandedSection === event
                    ? data?.marketplaceTickets?.[event]?.length
                    : 4
                )
                .map((order, index) => (
                  <HomeTicketCardComponent
                    key={index}
                    order={{
                      ...order,
                      ticket: {
                        ...order.ticket,
                        event: data?.eventMap?.[order.ticket.event],
                      },
                    }}
                  />
                ))}
              {(data?.marketplaceTickets[event] ?? []).length > 4 && (
                <Button
                  variant="tertiary"
                  size="sm"
                  className="block md:hidden"
                >
                  View All
                </Button>
              )}
            </div>
          </div>
        ))}

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
      </motion.div>
    </div>
  );
}
