export const PROFILE_FILTER_LABELS: Record<string, string> = {
  "": "Todos los perfiles",
  completed: "Perfil completo",
  pending: "Perfil pendiente",
};

export const SORT_FILTER_LABELS: Record<string, string> = {
  createdAt: "Más recientes",
  currentStreak: "Racha actual",
  bestStreak: "Mejor racha",
  totalDays: "Total de días",
};

export const DIRECTION_FILTER_LABELS: Record<string, string> = {
  desc: "Mayor a menor",
  asc: "Menor a mayor",
};

export function getProfileLabel(value: string): string {
  return PROFILE_FILTER_LABELS[value] ?? "Todos los perfiles";
}

export function getSortLabel(value: string): string {
  return SORT_FILTER_LABELS[value] ?? "Más recientes";
}

export function getDirectionLabel(value: string): string {
  return DIRECTION_FILTER_LABELS[value] ?? "Mayor a menor";
}
