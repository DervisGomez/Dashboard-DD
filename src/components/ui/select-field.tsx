import type { ReactNode } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  children,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-9 w-full min-w-0 cursor-pointer appearance-none
            rounded-lg border border-zinc-200/80 bg-white
            py-2 pl-3 pr-9 text-[13px] font-medium text-zinc-800
            shadow-[0_1px_2px_rgba(0,0,0,0.02)]
            ring-1 ring-zinc-950/[0.02]
            transition-all duration-200 ease-out
            hover:border-zinc-300 hover:bg-zinc-50/50
            focus:border-[#2e7d32]/40 focus:bg-white focus:outline-none
            focus:ring-2 focus:ring-[#2e7d32]/12
          "
        >
          {children}
        </select>
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className="
            pointer-events-none absolute right-2.5 top-1/2
            -translate-y-1/2 text-zinc-400
          "
          aria-hidden
        />
      </div>
    </div>
  );
}
