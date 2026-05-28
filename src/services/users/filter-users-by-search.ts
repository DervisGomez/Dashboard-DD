import {
  AppUser,
} from "@/types/user";

export function filterUsersBySearch(
  users: AppUser[],
  search?: string
) {
  const normalizedSearch =
    search?.trim().toLowerCase();

  if (!normalizedSearch) {
    return users;
  }

  return users.filter((user) =>
    user.displayName
      .toLowerCase()
      .includes(normalizedSearch)
  );
}
