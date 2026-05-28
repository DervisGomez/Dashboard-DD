import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Card({
  children,
  className,
  title,
  description,
}: CardProps) {
  return (
    <div className={cn("ui-card p-6", className)}>
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-lg font-semibold text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
