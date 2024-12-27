import HomeTicketCardComponent from "@/components/home/home-ticket-card-component";
import { Button } from "@/components/ui/button";
import { H2, H4 } from "@/components/ui/heading";
import { dummyTickets } from "@/utils/dummyData";

export default function Home() {
  const data = dummyTickets;
  return (
    <div className="mx-auto my-[50px] w-full max-w-[1200px]">
      <div className="grid w-full grid-cols-[auto_auto] gap-[32px]">
        <div className="flex w-fit flex-col gap-[16px]">
          <div className="flex w-full items-center justify-between">
            <H2 className="text-simpleWhite">My Tickets</H2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-[16px]">
            <HomeTicketCardComponent ticket={data[0]} />
          </div>
        </div>
        <div className="flex w-full flex-col gap-[16px] overflow-hidden">
          <div className="flex w-full items-center justify-between">
            <H2 className="text-simpleWhite">Tickets in Escrow</H2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="flex w-full gap-[16px]">
            <HomeTicketCardComponent ticket={data[1]} bgGradient="yellow" />
            <HomeTicketCardComponent ticket={data[2]} bgGradient="yellow" />
            <HomeTicketCardComponent ticket={data[3]} bgGradient="yellow" />
            <HomeTicketCardComponent ticket={data[3]} bgGradient="yellow" />
          </div>
        </div>
        <div className="col-span-2 flex w-full flex-col gap-[16px] overflow-hidden">
          <div className="flex w-full items-center justify-between">
            <H2 className="text-simpleWhite">Tickets I'm selling</H2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="flex w-full gap-[16px]">
            <HomeTicketCardComponent ticket={data[1]} bgGradient="pink" />
            <HomeTicketCardComponent ticket={data[2]} bgGradient="pink" />
            <HomeTicketCardComponent ticket={data[3]} bgGradient="pink" />
            <HomeTicketCardComponent ticket={data[3]} bgGradient="pink" />
          </div>
        </div>
      </div>
    </div>
  );
}
