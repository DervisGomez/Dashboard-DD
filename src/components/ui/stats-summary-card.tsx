interface StatsSummaryCardProps {
  icon: string;
  value: string | number;
  label: string;
  variant?: "default" | "prayer";
}

export function StatsSummaryCard({
  icon,
  value,
  label,
  variant = "default",
}: StatsSummaryCardProps) {
  return (
    <div
      className={
        variant === "prayer"
          ? "stats-card stats-summary-card stats-summary-card--prayer"
          : "stats-card stats-summary-card"
      }
    >
      <span className="stats-summary-icon" aria-hidden>
        {icon}
      </span>
      <strong>{value}</strong>
      <span className="stats-summary-label">{label}</span>
    </div>
  );
}
