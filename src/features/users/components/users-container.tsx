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

import { Button } from "@/components/ui/button";
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

  const sort =
    searchParams.get("sort") || "createdAt";

  const direction =
    searchParams.get("direction") || "desc";

  const queryKey =
    `${search}:${profile}:${sort}:${direction}`;

  const { user } = useAuth();

  const [users, setUsers] =
    useState<AppUser[]>([]);

  const [
    paginationState,
    setPaginationState,
  ] = useState({
    queryKey: "",
    cursor: null as string | null,
    nextCursor: null as string | null,
  });

  const [loading, setLoading] =
    useState(true);

  const currentCursor =
    paginationState.queryKey === queryKey
      ? paginationState.cursor
      : null;

  const currentNextCursor =
    paginationState.queryKey === queryKey
      ? paginationState.nextCursor
      : null;

  useEffect(() => {
    async function loadUsers() {
      try {
        if (!user) return;

        setLoading(true);

        const data =
        await getUsers({
          role:
            user.adminData.role,
        
          churchId:
            user.adminData.churchId,
        
          search,
        
          profile,

          sort:
            sort === "currentStreak" ||
            sort === "bestStreak" ||
            sort === "totalDays"
              ? sort
              : "createdAt",

          direction:
            direction === "asc"
              ? "asc"
              : "desc",

          cursor: currentCursor,
        });

        setUsers(data.users);

        setPaginationState({
          queryKey,
          cursor: currentCursor,
          nextCursor:
            data.pagination.nextCursor,
        });
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
    sort,
    direction,
    queryKey,
    currentCursor,
  ]);

  if (loading) {
    return (
      <UsersTableSkeleton />
    );
  }

  const hasFilters =
    Boolean(search.trim()) ||
    Boolean(profile) ||
    sort !== "createdAt" ||
    direction !== "desc";

  if (users.length === 0) {
    return (
      <EmptyState
        title={
          hasFilters
            ? "Sin resultados"
            : "No hay usuarios"
        }
        description={
          hasFilters
            ? "Prueba con otro término de búsqueda o ajusta los filtros."
            : "Todavía no existen usuarios registrados."
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UsersTable users={users} />

      {currentNextCursor && (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setPaginationState((current) => ({
                queryKey,
                cursor: current.nextCursor,
                nextCursor: null,
              }))
            }
            className="
              hover:border-[#2e7d32]/30 hover:bg-[#f0fdf4]
              hover:text-[#276c2c]
            "
          >
            Cargar más usuarios
          </Button>
        </div>
      )}
    </div>
  );
}
