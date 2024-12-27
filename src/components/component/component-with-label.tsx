import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

type ComponentWithLabelProps = {
  label: string;
  children: React.ReactNode;
  gap?: number;
} & React.HTMLAttributes<HTMLLabelElement>;

export const ComponentWithLabel = forwardRef<
  HTMLLabelElement,
  ComponentWithLabelProps
>((props, ref) => {
  const { label, children, gap = 8, ...labelProps } = props;
  return (
    <div>
      <label
        ref={ref}
        {...labelProps}
        className={cn(
          "flex flex-col text-[14px] font-medium leading-[20px] text-simpleGray500",
          `gap-[${gap}px]`,
          labelProps.className
        )}
      >
        {label}
        {children}
      </label>
    </div>
  );
});

ComponentWithLabel.displayName = "ComponentWithLabel";
