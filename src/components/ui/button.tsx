import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-primary-foreground
    hover:bg-[var(--primary-hover)]
    shadow-sm
    disabled:opacity-60
  `,
  secondary: `
    border border-border bg-card text-foreground
    hover:bg-muted
    disabled:opacity-60
  `,
  outline: `
    border border-zinc-200/80 bg-white text-zinc-700
    shadow-[0_1px_2px_rgba(0,0,0,0.03)]
    ring-1 ring-zinc-950/[0.03]
    hover:border-zinc-300 hover:bg-zinc-50
    disabled:opacity-60
  `,
  ghost: `
    text-muted-foreground
    hover:bg-muted hover:text-foreground
    disabled:opacity-60
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        `
          inline-flex items-center justify-center gap-2
          rounded-lg font-medium
          transition-all duration-150 ease-out
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#2e7d32]/25
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed
        `,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
