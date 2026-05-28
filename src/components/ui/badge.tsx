import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

export function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        `
          inline-flex items-center rounded-full px-2.5 py-0.5
          text-xs font-medium ring-1 ring-inset
        `,
        variant === "default" &&
          "bg-zinc-100 text-zinc-600 ring-zinc-200/80",
        variant === "success" &&
          "bg-[#e8f5e9] text-[#2e7d32] ring-[#2e7d32]/15",
        variant === "warning" &&
          "bg-amber-50 text-amber-700 ring-amber-200/80"
      )}
    >
      {children}
    </span>
  );
}
