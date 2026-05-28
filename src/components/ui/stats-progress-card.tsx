interface StatsProgressCardProps {
  title: string;
  description: string;
  value: number;
  max: number;
  microcopy: string;
  subtle?: boolean;
}

export function StatsProgressCard({
  title,
  description,
  value,
  max,
  microcopy,
  subtle,
}: StatsProgressCardProps) {
  const progress =
    max > 0 ? Math.min(1, value / max) : 0;

  return (
    <div
      className={
        subtle
          ? "stats-card stats-progress-card stats-progress-card--subtle"
          : "stats-card stats-progress-card"
      }
    >
      <div className="stats-progress-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span>{value}</span>
      </div>
      <div
        className="stats-progress-bar"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="stats-progress-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="stats-microcopy">{microcopy}</p>
    </div>
  );
}
