import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/services/firebase";

import {
  getAdminByUid,
} from "@/services/admins/get-admin-by-uid";

export async function loginUser(
  email: string,
  password: string
) {
  const normalizedEmail = email.trim().toLowerCase();

  const response =
    await signInWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    );

  const adminData = await getAdminByUid(
    response.user.uid
  );

  if (!adminData) {
    await signOut(auth);
    throw new Error("NOT_ADMIN");
  }

  if (adminData.isActive === false) {
    await signOut(auth);
    throw new Error("ADMIN_INACTIVE");
  }

  return response.user;
}
