import { cn } from "@/utils/cn";

const paragraphDefaultClassName =
  "leading[1.5em] text-switzer text-simpleGray900";

export function PLarge(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        paragraphDefaultClassName,
        "text-[24px] font-bold",
        props.className
      )}
    />
  );
}

export function PMedium(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(paragraphDefaultClassName, "text-[20px]", props.className)}
    />
  );
}

export function PSmall(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(paragraphDefaultClassName, "text-[16px]", props.className)}
    />
  );
}
