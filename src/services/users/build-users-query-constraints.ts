import {
  limit,
  QueryConstraint,
  where,
} from "firebase/firestore";

import {
  AdminRole,
} from "@/types/admin";

import {
  GetUsersOptions,
} from "./types";

const DEFAULT_USERS_LIMIT = 20;

export function buildUsersQueryConstraints({
  role,
  churchId,
  profile,
}: GetUsersOptions): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (
    role === AdminRole.ADMIN_CHURCH &&
    churchId
  ) {
    constraints.push(
      where(
        "churchId",
        "==",
        churchId
      )
    );
  }

  if (profile === "completed") {
    constraints.push(
      where(
        "profileCompleted",
        "==",
        true
      )
    );
  }

  if (profile === "pending") {
    constraints.push(
      where(
        "profileCompleted",
        "==",
        false
      )
    );
  }

  constraints.push(
    limit(DEFAULT_USERS_LIMIT)
  );

  return constraints;
}
