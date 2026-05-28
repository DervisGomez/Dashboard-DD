"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useEffect,
} from "react";

import {
  useAuth,
} from "../context/auth-context";

import {
  AuthLoading,
} from "./auth-loading";

export function HomeRedirect() {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    router.replace(
      user ? "/dashboard" : "/login"
    );
  }, [
    user,
    loading,
    router,
  ]);

  return <AuthLoading />;
}
