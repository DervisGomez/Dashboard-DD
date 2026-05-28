const DAY_IN_MS = 24 * 60 * 60 * 1000;

function parseDateOnly(date: string): Date | null {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getVisibleCurrentStreak(params: {
  currentStreak?: number;
  lastDevotionalDate?: string;
}): number {
  const { currentStreak = 0, lastDevotionalDate } = params;

  if (currentStreak <= 0 || !lastDevotionalDate) {
    return 0;
  }

  const lastDate = parseDateOnly(lastDevotionalDate);
  if (!lastDate) {
    return 0;
  }

  const today = new Date();
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const dayDiff = Math.floor(
    (todayDateOnly.getTime() - lastDate.getTime()) / DAY_IN_MS
  );

  return dayDiff === 0 || dayDiff === 1 ? currentStreak : 0;
}
