import { Button } from "../ui/button";
import { H4 } from "../ui/heading";
import { PSmall } from "../ui/paragraph";

export default function TicketsOnSellMessage() {
  return (
    <div className="m-auto flex max-w-[1000px] flex-col gap-[16px] rounded-bl-[16px] rounded-tr-[16px] bg-simpleWhite p-[48px]">
      <H4 className="text-simpleGray700">Your tickets are on sale!</H4>
      <div className="flex flex-col gap-[8px]">
        <PSmall className="text-simpleGray700">
          Go to the 🏠 Home page, where you can:
          <ul className="list-disc list-inside">
            <li>Manage all your tickets</li>
            <li>View other tickets on sale</li>
            <li>Go through other events happening around the world</li>
          </ul>
        </PSmall>
        <Button>go home</Button>
      </div>
    </div>
  );
}
