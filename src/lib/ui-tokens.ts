/**
 * Sistema visual escalable (escala 4px).
 * Usar estos tokens en lugar de valores sueltos.
 */
export const ui = {
  /* Superficies */
  surface:
    "rounded-xl border border-zinc-200/70 bg-white shadow-sm ring-1 ring-zinc-950/[0.03]",
  surfaceMuted:
    "rounded-xl border border-zinc-200/60 bg-zinc-50/40 ring-1 ring-zinc-950/[0.02]",

  /* Interacción */
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32]/25 focus-visible:ring-offset-2",
  transition: "transition-colors duration-200 ease-out",

  /* Tipografía */
  pageTitle:
    "text-2xl font-semibold tracking-tight text-zinc-900",
  pageDescription: "text-sm leading-relaxed text-zinc-500",
  sectionTitle: "text-sm font-semibold text-zinc-900",
  sectionDescription: "mt-0.5 text-sm text-zinc-500",
  label: "text-xs font-medium text-zinc-600",
  overline:
    "text-[11px] font-medium uppercase tracking-wider text-zinc-400",

  /* Layout (escala 4 → 8 → 12 → 16 → 24 → 32) */
  stackPage: "flex flex-col gap-8",
  stackSection: "flex flex-col gap-6",
  stackBlock: "flex flex-col gap-4",
  insetCard: "p-5 sm:p-6",
} as const;
