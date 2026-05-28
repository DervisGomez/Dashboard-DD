"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
  panelClassName?: string;
}

export function Popover({
  open,
  onOpenChange,
  trigger,
  children,
  align = "end",
  className,
  panelClassName,
}: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {trigger}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className={cn(
            `
              absolute top-[calc(100%+6px)] z-50 w-[min(100vw-2rem,18rem)]
              rounded-xl border border-zinc-200/80 bg-white p-4
              shadow-lg ring-1 ring-zinc-950/[0.05]
            `,
            align === "end" ? "right-0" : "left-0",
            panelClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
