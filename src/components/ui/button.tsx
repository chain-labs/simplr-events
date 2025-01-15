"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "primary-danger"
  | "outline-danger"
  | "primary-blue"
  | "tertiary"
  | "tertiary-dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-full font-bold transition-colors duration-200 whitespace-nowrap lowercase w-full md:w-fit";

    const variants = {
      primary:
        "bg-simpleYellow text-simpleBlack shadow-[inset_2px_4px_4px_#FAFFD3BF,_inset_-2px_-4px_4px_#63680040]",
      secondary:
        "bg-[#FFFFFF03] text-simpleBlack shadow-[inset_2px_4px_4px_#D3E1FFBF,_inset_-2px_-4px_4px_#00096840,_inset_0_0_0_2px_#050505]",
      outline:
        "bg-[#FFFFFF03] text-simpleWhite shadow-[inset_2px_4px_4px_#FAFFD3BF,_inset_-2px_-4px_4px_#63680040,_inset_0_0_0_2px_#ffffff]",
      ghost: "text-simpleWhite bg-[#FFFFFF03]",
      "primary-danger":
        "bg-simpleRed text-simpleWhite shadow-[inset_2px_4px_4px_#FFD3D3BF,_inset_-2px_-4px_4px_#96000040]",
      "outline-danger":
        "bg-[#FFFFFF03] text-simpleRed shadow-[inset_2px_4px_4px_#D3E1FFBF,_inset_-2px_-4px_4px_#00096840,_inset_0_0_0_2px_#FF4242]",
      "primary-blue":
        "bg-simpleBlue text-simpleWhite shadow-[inset_2px_4px_4px_#D3E1FFBF,_inset_-2px_-4px_4px_#00096840]",
      tertiary: "bg-[#0000001A] text-simpleWhite",
      "tertiary-dark": "bg-[#FFFFFF26] text-simpleBlack",
    };

    const sizes = {
      sm: "px-[16px] py-[8px] text-[16px] leading-[20.8px] tracking-[0.02em]",
      md: "py-[8px] px-[16px] text-[20px] leading-[1.3em] tracking-[0.02em]",
      lg: "px-6 py-3 text-[24px] leading-[1.3em] tracking-[0.02em]",
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      (disabled || isLoading) && "opacity-50 cursor-not-allowed",
      className
    );

    return (
      <button
        {...props}
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
