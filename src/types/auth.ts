import { User } from "firebase/auth";

import { Admin } from "./admin";

export interface AuthUser {
  firebaseUser: User;
  adminData: Admin;
}