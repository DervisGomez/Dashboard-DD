import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("space-y-1", className)}>
      <h1 className={ui.pageTitle}>{title}</h1>
      {description && (
        <p className={cn(ui.pageDescription, "max-w-xl")}>
          {description}
        </p>
      )}
    </header>
  );
}
