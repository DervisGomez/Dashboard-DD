import type { ReactNode } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type IconButtonProps = {
  label: string;
  className?: string;
  children: ReactNode;
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick?: () => void }
);

export function IconButton({
  href,
  onClick,
  label,
  className,
  children,
}: IconButtonProps) {
  const classes = cn(
    `
      inline-flex h-8 w-8 items-center justify-center
      rounded-lg text-zinc-400
      transition-all duration-200 ease-out
      hover:bg-zinc-100 hover:text-zinc-900
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-[#2e7d32]/20 focus-visible:ring-offset-2
    `,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} title={label} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}
