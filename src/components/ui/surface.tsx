import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

type SurfaceVariant = "default" | "muted" | "ghost";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
  variant?: SurfaceVariant;
  as?: "div" | "section" | "article";
}

const variants: Record<SurfaceVariant, string> = {
  default: ui.surface,
  muted: ui.surfaceMuted,
  ghost: "rounded-xl",
};

export function Surface({
  children,
  className,
  variant = "default",
  as: Component = "div",
}: SurfaceProps) {
  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}
