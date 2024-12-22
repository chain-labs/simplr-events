"use client";

import { cn } from "@/utils/cn";

const labelDefaultClassName =
  "leading-[1.3em] tracking-[0.1em] font-semibold uppercase flex items-center gap-[1ch] font-simpleGray700 [&_svg]:text-[16px]";

export function LabelLarge(props: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label
      className={cn(labelDefaultClassName, "text-[16px]", props.className)}
      {...props}
    />
  );
}

export function LabelMedium(props: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label
      className={cn(labelDefaultClassName, "text-[14px]", props.className)}
      {...props}
    />
  );
}

export function LabelSmall(props: React.HTMLProps<HTMLLabelElement>) {
  return (
    <label
      className={cn(labelDefaultClassName, "text-[12px]", props.className)}
      {...props}
    />
  );
}
