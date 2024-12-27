import { cn } from "@/utils/cn";

export function PLarge(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        "text-switzer text-[24px] font-bold leading-[1.5em] text-simpleGray900",
        props.className
      )}
    />
  );
}

export function PMedium(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        "text-switzer text-[20px] leading-[1.5em] text-simpleGray900",
        props.className
      )}
    />
  );
}

export function PSmall(props: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        "text-switzer text-[16px] leading-[1.5em] text-simpleGray900",
        props.className
      )}
    />
  );
}
