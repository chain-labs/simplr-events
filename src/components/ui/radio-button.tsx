"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/utils/cn";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked || false);

    React.useEffect(() => {
      setChecked(props.checked || false);
    }, [props.checked]);

    return (
      <>
        <input {...props} type="radio" ref={ref} className="hidden" />
        <div
          className={cn(
            "aspect-square h-[16px] w-[16px] cursor-pointer rounded-full ring-inset",
            checked ? "ring-[5px] ring-simpleBlue" : "ring-1 ring-simpleGray200"
          )}
        ></div>
      </>
    );
  }
);

export default RadioButton;
