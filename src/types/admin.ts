export enum AdminRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN_CHURCH = "ADMIN_CHURCH",
  }
  
  export interface Admin {
    uid: string;
    email: string;
    displayName: string;
    churchId: string | null;
    role: AdminRole;
    isActive: boolean;
  }