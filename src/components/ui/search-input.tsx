import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  size?: "default" | "lg";
  className?: string;
}

export function SearchInput({
  id,
  value,
  onChange,
  placeholder = "Buscar...",
  label,
  hint,
  size = "default",
  className,
}: SearchInputProps) {
  const isLarge = size === "lg";

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex items-baseline justify-between gap-2">
          <label className="text-xs font-medium text-zinc-600">
            {label}
          </label>
          {hint && (
            <span className="text-[11px] text-zinc-400">{hint}</span>
          )}
        </div>
      )}

      <div className="relative">
        <Search
          size={isLarge ? 18 : 16}
          strokeWidth={2}
          className={cn(
            `
              pointer-events-none absolute top-1/2
              -translate-y-1/2 text-zinc-400
              transition-colors duration-200
            `,
            isLarge ? "left-4" : "left-3.5",
            value.length > 0 && "text-[#2e7d32]/70"
          )}
          aria-hidden
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            `
              w-full min-w-0 rounded-xl border border-zinc-200/80
              bg-zinc-50/80 text-zinc-900
              shadow-[0_1px_2px_rgba(0,0,0,0.03)]
              ring-1 ring-zinc-950/[0.03]
              placeholder:text-zinc-400
              transition-all duration-200 ease-out
              hover:border-zinc-300 hover:bg-white
              focus:border-[#2e7d32]/40 focus:bg-white focus:outline-none
              focus:ring-2 focus:ring-[#2e7d32]/12
            `,
            isLarge
              ? "h-11 py-2.5 pl-11 pr-11 text-sm"
              : "h-9 py-2 pl-10 pr-10 text-sm"
          )}
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className={cn(
              `
                absolute top-1/2 flex -translate-y-1/2
                items-center justify-center rounded-md
                text-zinc-400 transition-colors duration-200
                hover:bg-zinc-200/80 hover:text-zinc-700
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#2e7d32]/20
              `,
              isLarge ? "right-3 h-7 w-7" : "right-2 h-6 w-6"
            )}
            aria-label="Borrar búsqueda"
          >
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
