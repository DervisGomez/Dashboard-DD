import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BackLink({
  href,
  children,
  className,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        `
          group inline-flex w-fit items-center gap-1.5
          rounded-md px-2 py-1.5 text-sm font-medium text-zinc-500
        `,
        ui.transition,
        ui.focusRing,
        "hover:bg-zinc-100 hover:text-zinc-900",
        className
      )}
    >
      <ArrowLeft
        size={15}
        strokeWidth={2}
        className="
          transition-transform duration-200
          group-hover:-translate-x-0.5
        "
        aria-hidden
      />
      {children}
    </Link>
  );
}
