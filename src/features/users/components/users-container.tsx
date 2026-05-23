"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
} from "@/services/users/get-users";

import {
  UsersTable,
} from "./users-table";

import {
  AppUser,
} from "@/types/user";

import {
  useAuth,
} from "@/features/auth/context/auth-context";

import {
    UsersTableSkeleton,
  } from "./users-table-skeleton";
  
  import {
    EmptyState,
  } from "@/components/ui/empty-state";
  import {
    useSearchParams,
  } from "next/navigation";

export function UsersContainer() {

  const searchParams =
  useSearchParams();

const search =
  searchParams.get("search") || "";

const profile =
  searchParams.get("profile") || "";

  const { user } = useAuth();

  const [users, setUsers] =
    useState<AppUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        if (!user) return;

        const data =
        await getUsers({
          role:
            user.adminData.role,
        
          churchId:
            user.adminData.churchId,
        
          search,
        
          profile,
        });

        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [
    user,
    search,
    profile,
  ]);

  if (loading) {
    return (
      <UsersTableSkeleton />
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState
        title="No hay usuarios"
        description="
          Todavía no existen usuarios registrados.
        "
      />
    );
  }

  return (
    <UsersTable users={users} />
  );
}