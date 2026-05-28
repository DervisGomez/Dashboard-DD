interface StatsHeroCardProps {
  icon: string;
  value: number;
  label: string;
  message?: string;
  footnote?: string;
}

export function StatsHeroCard({
  icon,
  value,
  label,
  message,
  footnote,
}: StatsHeroCardProps) {
  return (
    <div className="stats-card stats-hero-card">
      <div className="stats-hero-icon" aria-hidden>
        {icon}
      </div>
      <p className="stats-hero-number">{value}</p>
      <p className="stats-hero-label">{label}</p>
      {message && (
        <p className="stats-hero-message">{message}</p>
      )}
      {footnote && (
        <p className="stats-microcopy">{footnote}</p>
      )}
    </div>
  );
}
