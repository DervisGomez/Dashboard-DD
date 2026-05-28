export function AuthLoading() {
  return (
    <div
      className="
        flex min-h-screen flex-col items-center
        justify-center gap-3 bg-background
      "
    >
      <div
        className="
          h-10 w-10 animate-spin rounded-full
          border-2 border-muted border-t-primary
        "
        role="status"
        aria-label="Cargando"
      />

      <p className="text-sm text-muted-foreground">
        Cargando...
      </p>
    </div>
  );
}
