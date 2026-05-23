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

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return null;
  }

  return children;
}