import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db }
  from "@/services/firebase";

import { AppUser }
  from "@/types/user";

import {
  AdminRole,
} from "@/types/admin";

interface GetUserByIdOptions {
  id: string;

  role: AdminRole;

  churchId: string | null;
}

export async function getUserById({
  id,
  role,
  churchId,
}: GetUserByIdOptions) {
  const userRef = doc(
    db,
    "users",
    id
  );

  const snapshot =
    await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const user = {
    id: snapshot.id,

    ...(snapshot.data() as Omit<
      AppUser,
      "id"
    >),
  };

  // Protección frontend extra
  if (
    role ===
      AdminRole.ADMIN_CHURCH &&
    user.churchId !== churchId
  ) {
    return null;
  }

  return user;
}