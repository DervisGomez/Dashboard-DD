export interface UserDevotionalStats {
  currentStreak: number;
  bestStreak: number;
  lastDevotionalDate?: string;
  totalDays: number;
  yearDays: number;
  lastYear?: number;
  monthDays: number;
  lastMonth?: string;
}

export interface UserPrayerStats {
  activeCount: number;
  answeredCount: number;
  archivedCount: number;
  totalCount: number;
  totalResponses: number;
}

/** @deprecated Usar UserDevotionalStats */
export type UserStats = UserDevotionalStats;

export interface AppUser {
  id: string;

  churchId: string;

  firstName: string;

  lastName: string;

  displayName: string;

  email: string;

  profileCompleted: boolean;

  devotionalPreferredTime: string;

  stats?: UserDevotionalStats;

  prayerStats?: UserPrayerStats;

  createdAt: string;

  updatedAt: string;
}
