import { cn } from "@/utils/cn";

const headingDefaultClassName = "font-gambarino font-normal text-simpleGray900";

export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        headingDefaultClassName,
        "text-[56px] leading-[1.15em]",
        props.className
      )}
      {...props}
    />
  );
}

export function H2(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        headingDefaultClassName,
        "text-[48px] leading-[1.15em]",
        props.className
      )}
      {...props}
    />
  );
}

export function H3(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        headingDefaultClassName,
        "text-[40px] leading-[1.2em]",
        props.className
      )}
      {...props}
    />
  );
}

export function H4(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        headingDefaultClassName,
        "text-[36px] leading-[1.2em]",
        props.className
      )}
      {...props}
    />
  );
}

export function H5(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        headingDefaultClassName,
        "text-[32px] leading-[1.2em]",
        props.className
      )}
      {...props}
    />
  );
}