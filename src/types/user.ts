export interface UserStats {
    currentStreak: number;
    bestStreak: number;
    totalDays: number;
  }
  
  export interface AppUser {
    id: string;
  
    churchId: string;
  
    firstName: string;
  
    lastName: string;
  
    displayName: string;
  
    email: string;
  
    profileCompleted: boolean;
  
    devotionalPreferredTime: string;
  
    stats: UserStats;
  
    createdAt: string;
  
    updatedAt: string;
  }