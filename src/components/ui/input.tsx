import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  parentClassName?: string;
  valid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = "right", ...props }, ref) => {
    return (
      <div className={cn("relative h-fit", props.parentClassName)}>
        <input
          {...props}
          type={type}
          className={cn(
            "border-1 placeholder:text-simpleGray500 focus-visible:ring-ring flex h-10 w-full rounded-[8px] border border-simpleGray300 bg-white px-[12px] py-[8px] font-switzer text-sm text-simpleGray900 shadow-[0_1px_2px_#1018280D] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" && "pl-[42px]",
            icon && iconPosition === "right" && "pr-[42px]",
            props.valid &&
              "border-[#D6BBFB] text-simpleGray900 shadow-[0_0_0_4px_#9E77ED3D] focus:ring-[4px] focus:ring-[#9E77ED3D]",
            className
          )}
          ref={ref}
        />
        {icon && (
          <div
            className={cn(
              "absolute top-0 flex h-full items-center text-[20px] leading-[20px] text-simpleGray500",
              iconPosition === "left" && "left-[14px]",
              iconPosition === "right" && "right-[14px]"
            )}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
