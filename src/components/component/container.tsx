import React from "react";

import { cn } from "@/utils/cn";

type ContainerProps = {
  children: React.ReactNode;
  parentClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-grow items-center justify-center",
          props.parentClassName
        )}
      >
        <div
          {...props}
          ref={ref}
          className={cn(
            "mx-[16px] w-full max-w-[1000px] rounded-bl-[24px] rounded-tr-[24px] bg-simpleWhite p-[16px] shadow-[inset_2px_4px_4px_0px_#FAFFD3BF,inset_-2px_-4px_4px_0px_#63680040]",
            "md:m-auto md:w-auto md:p-[48px]",
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
