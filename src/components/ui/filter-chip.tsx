import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

interface FilterChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export function FilterChip({
  label,
  onRemove,
  className,
}: FilterChipProps) {
  return (
    <span
      className={cn(
        `
          inline-flex max-w-full items-center gap-1
          rounded-md border border-zinc-200/80 bg-white
          px-2 py-0.5 text-xs font-medium text-zinc-600
          ring-1 ring-zinc-950/[0.03]
        `,
        className
      )}
    >
      <span className="truncate">{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            `
              -mr-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center
              justify-center rounded text-zinc-400
            `,
            ui.transition,
            ui.focusRing,
            "hover:bg-zinc-100 hover:text-zinc-700"
          )}
          aria-label={`Quitar filtro ${label}`}
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}
