import { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ListProps = {
  items: (
    | string
    | { data: string | ReactNode; className: string }
    | ReactNode
  )[];
  parentClassName?: string;
};

export const List = ({ items, parentClassName }: ListProps) => {
  return (
    <ol className={cn("flex flex-col gap-[8px]", parentClassName)}>
      {items.length > 0 &&
        items.map((item, index) => {
          if (
            item !== null &&
            typeof item === "object" &&
            "className" in item
          ) {
            return (
              <li
                key={index}
                className={cn(
                  "grid grid-cols-[32px_auto] gap-[8px]",
                  item.className
                )}
              >
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F2FF49A8] text-[16px] leading-[24px]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="my-auto">{item.data}</span>
              </li>
            );
          } else {
            return (
              <li key={index} className="grid grid-cols-[32px_auto] gap-[8px]">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F2FF49A8] text-[16px] leading-[24px]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span className="my-auto">{item}</span>
              </li>
            );
          }
        })}
    </ol>
  );
};
