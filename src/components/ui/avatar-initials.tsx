import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

function getInitials(name?: string | null): string {
  const trimmed = name?.trim();

  if (!trimmed) {
    return "?";
  }

  const parts = trimmed
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return parts
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function AvatarInitials({
  name,
  size = "md",
  className,
}: AvatarInitialsProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        `
          flex shrink-0 items-center justify-center
          rounded-full bg-gradient-to-br
          from-[#2e7d32] to-[#438a47]
          font-semibold text-white shadow-sm
        `,
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
