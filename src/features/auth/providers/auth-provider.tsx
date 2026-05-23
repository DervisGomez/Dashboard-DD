"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth }
  from "@/services/firebase";

import { AuthContext }
  from "../context/auth-context";

import { getAdminByUid }
  from "@/services/admins/get-admin-by-uid";

import { AuthUser }
  from "@/types/auth";
import { Admin } from "@/types/admin";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          console.log("firebaseUser", firebaseUser);
          try {
            if (!firebaseUser) {
              setUser(null);
              setLoading(false);
              return;
            }

            const adminData =
              await getAdminByUid(
                firebaseUser.uid
              );

            console.log("adminData", adminData);

            if (!adminData) {
              await signOut(auth);

              setUser(null);

              setLoading(false);

              return;
            }

            setUser({
              firebaseUser,
              adminData: adminData as Admin,
            });
          } catch (error) {
            console.error(error);

            setUser(null);
          } finally {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, []);

  async function logout() {
    await signOut(auth);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}