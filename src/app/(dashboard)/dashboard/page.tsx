export default function DashboardPage() {
  return (
    <div
      className="
        ui-card flex flex-col items-start gap-2 p-6
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      <div>
        <p className="font-medium text-foreground">
          Resumen general
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Usa el menú lateral para gestionar usuarios,
          iglesias y administradores.
        </p>
      </div>
    </div>
  );
}
