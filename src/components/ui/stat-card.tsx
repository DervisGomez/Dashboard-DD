interface StatCardProps {
  title: string;

  value: string | number;
}

export function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div
      className="
        ui-card p-5 transition-shadow
        hover:shadow-[var(--shadow-card)]
      "
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <p className="text-sm font-medium text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}
