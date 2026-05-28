export interface ChurchDashboardStats {
  usersTotal: number;
  usersProfileCompleted: number;
  usersProfilePending: number;
  devotionalTotalDays: number;
  prayerActiveCount: number;
  prayerAnsweredCount: number;
  prayerArchivedCount: number;
  prayerTotalCount: number;
  prayerTotalResponses: number;
}

export interface ChurchDashboardTopUser {
  userId: string;
  displayName: string;
  email: string | null;
  value: number;
}

export interface ChurchDashboardHighlights {
  topBestStreakUser: ChurchDashboardTopUser | null;
  topDevotionalDaysUser: ChurchDashboardTopUser | null;
}

export interface GetChurchDashboardStatsResult {
  churchId: string;
  stats: ChurchDashboardStats;
  highlights: ChurchDashboardHighlights;
}
