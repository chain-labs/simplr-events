import Container from "../component/container";
import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PSmall } from "../ui/paragraph";

export default function TicketsOnSellMessage() {
  return (
    <Container className="max-w-[1000px] md:my-[50px]">
      <div className="flex flex-col gap-[16px]">
        <H4 className="text-simpleGray700">Your tickets are on sale!</H4>
        <div className="flex flex-col gap-[8px]">
          <PSmall className="text-simpleGray700">
            Go to the 🏠 Home page, where you can:
            <ul className="list-inside list-disc">
              <li>Manage all your tickets</li>
              <li>View other tickets on sale</li>
              <li>Go through other events happening around the world</li>
            </ul>
          </PSmall>
          <Button>go home</Button>
        </div>
      </div>
    </Container>
  );
}
