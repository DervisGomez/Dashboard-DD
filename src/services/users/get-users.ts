import {
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

import { db }
  from "@/services/firebase";

import { AppUser }
  from "@/types/user";

import {
  AdminRole,
} from "@/types/admin";

interface GetUsersOptions {
  role: AdminRole;

  churchId: string | null;

  search?: string;

  profile?: string;
}

export async function getUsers({
  role,
  churchId,
  search,
  profile,
}: GetUsersOptions) {
  const usersRef =
    collection(db, "users");

  const constraints = [];

  if (
    role ===
    AdminRole.ADMIN_CHURCH
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

  constraints.push(limit(20));

  const usersQuery = query(
    usersRef,
    ...constraints
  );

  const snapshot =
    await getDocs(usersQuery);

  let users: AppUser[] =
    snapshot.docs.map((doc) => ({
      id: doc.id,

      ...(doc.data() as Omit<
        AppUser,
        "id"
      >),
    }));

  if (search) {
    users = users.filter((user) =>
      user.displayName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }

  return users;
}