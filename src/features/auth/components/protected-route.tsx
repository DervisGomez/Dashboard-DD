"use client";

import {
  usePathname,
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

import {
  dashboardNavigation,
} from "@/constants/navigation";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    loading,
  } = useAuth();

  const currentRoute =
    dashboardNavigation.find((item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );

  const canAccessCurrentRoute =
    !currentRoute ||
    (
      user &&
      currentRoute.roles.includes(
        user.adminData.role
      )
    );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    if (
      !loading &&
      user &&
      !canAccessCurrentRoute
    ) {
      router.replace("/dashboard");
    }
  }, [
    user,
    loading,
    canAccessCurrentRoute,
    router,
  ]);

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return null;
  }

  if (!canAccessCurrentRoute) {
    return null;
  }

  return children;
}
