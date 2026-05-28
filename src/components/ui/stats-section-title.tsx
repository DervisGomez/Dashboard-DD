import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

interface StatsSectionTitleProps {
  title: string;
  icon?: string;
  subtitle?: string;
  secondary?: boolean;
}

export function StatsSectionTitle({
  title,
  icon,
  subtitle,
  secondary,
}: StatsSectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-4",
        secondary && "pt-2"
      )}
    >
      <h2
        className={cn(
          "flex items-center gap-2",
          ui.sectionTitle
        )}
      >
        {icon && (
          <span
            className="text-base font-normal leading-none"
            aria-hidden
          >
            {icon}
          </span>
        )}
        <span>{title}</span>
      </h2>
      {subtitle && (
        <p className={ui.sectionDescription}>{subtitle}</p>
      )}
    </div>
  );
}
