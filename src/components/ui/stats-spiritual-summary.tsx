interface StatsSpiritualSummaryProps {
  lines: string[];
}

export function StatsSpiritualSummary({
  lines,
}: StatsSpiritualSummaryProps) {
  return (
    <div className="stats-card stats-spiritual-summary">
      {lines.map((line, index) => (
        <p key={index} className="stats-spiritual-line">
          {line}
        </p>
      ))}
    </div>
  );
}
