/** Mensajes alineados con stats.page.ts de la app móvil */

export function getStreakMessage(streak: number): string {
  if (streak === 0) {
    return "Hoy es un buen día para comenzar.";
  }
  if (streak <= 2) {
    return "Está dando los primeros pasos 💪";
  }
  if (streak <= 5) {
    return "Va construyendo constancia.";
  }
  if (streak <= 10) {
    return "Ya es parte de su rutina 👏";
  }
  if (streak <= 20) {
    return "Disciplina en crecimiento.";
  }
  return "Esto ya es un estilo de vida 🏆";
}

export function getSpiritualSummaryLine(streak: number): string {
  if (streak <= 0) {
    return "Puede dar un paso para acercarse a Dios.";
  }
  if (streak === 1) {
    return "Lleva 1 día acercándose a Dios.";
  }
  return `Lleva ${streak} días acercándose a Dios.`;
}

export function getPrayerSummaryLine(activeCount: number): string {
  if (activeCount <= 0) {
    return "Sin motivos activos en oración.";
  }
  if (activeCount === 1) {
    return "Tiene 1 motivo en oración activa.";
  }
  return `Tiene ${activeCount} motivos en oración activa.`;
}

export function getMonthMessage(count: number): string {
  if (count === 0) {
    return "Aún no hay días registrados este mes.";
  }
  if (count === 1) {
    return "Un día de constancia este mes.";
  }
  return `${count} días de constancia este mes.`;
}

export function getYearMessage(count: number): string {
  if (count === 0) {
    return "Aún no hay días registrados este año.";
  }
  if (count === 1) {
    return "Un día de constancia este año.";
  }
  return `${count} días de constancia este año.`;
}
