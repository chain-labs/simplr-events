import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = "right", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "border-1 border-simpleGray300 placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-[8px] border bg-white px-[14px] py-[10px] font-switzer text-sm shadow-[0_1px_2px_#1018280D] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon && iconPosition === "left" && "pl-[42px]",
            icon && iconPosition === "right" && "pr-[42px]",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "text-simpleGray500 absolute top-0 flex h-full items-center text-[20px] leading-[20px]",
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
