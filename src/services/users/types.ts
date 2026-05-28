import {
  AdminRole,
} from "@/types/admin";

export type UsersProfileFilter =
  "completed" |
  "pending" |
  "";

export type UsersSortKey =
  "createdAt" |
  "currentStreak" |
  "bestStreak" |
  "totalDays";

export type UsersSortDirection =
  "asc" |
  "desc";

export interface GetUsersOptions {
  role: AdminRole;

  churchId: string | null;

  search?: string;

  profile?: string;

  sort?: UsersSortKey;

  direction?: UsersSortDirection;

  cursor?: string | null;

  limit?: number;
}

export interface GetUsersPagination {
  limit: number;

  hasNextPage: boolean;

  nextCursor: string | null;
}

export interface GetUsersResult {
  users: import("@/types/user").AppUser[];

  pagination: GetUsersPagination;
}
