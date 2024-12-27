import React from "react";

import { cn } from "@/utils/cn";

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    return (
      <div className="flex h-full w-full flex-grow items-center justify-center">
        <div
          {...props}
          ref={ref}
          className={cn(
            "m-auto max-w-[1000px] rounded-bl-[24px] rounded-tr-[24px] bg-simpleWhite p-[48px] shadow-[inset_2px_4px_4px_0px_#FAFFD3BF,inset_-2px_-4px_4px_0px_#63680040]",
            props.className
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
