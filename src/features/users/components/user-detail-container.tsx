"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  useAuth,
} from "@/features/auth/context/auth-context";

import {
  getUserById,
} from "@/services/users/get-user-by-id";

import { AppUser }
  from "@/types/user";

import {
  AvatarInitials,
} from "@/components/ui/avatar-initials";

import {
  Badge,
} from "@/components/ui/badge";

import {
  StatCard,
} from "@/components/ui/stat-card";

export function UserDetailContainer() {
  const params = useParams();

  const { user: adminUser } =
    useAuth();

  const [user, setUser] =
    useState<AppUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        if (!adminUser) return;

        const data =
          await getUserById({
            id: params.id as string,

            role:
              adminUser.adminData
                .role,

            churchId:
              adminUser.adminData
                .churchId,
          });

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [adminUser, params.id]);

  if (loading) {
    return (
      <p>Cargando usuario...</p>
    );
  }

  if (!user) {
    return (
      <p>
        Usuario no encontrado
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className="
          rounded-xl
          border
          bg-white
          p-6
        "
      >
        <div className="flex items-center gap-4">
          <AvatarInitials
            name={user.displayName}
          />

          <div>
            <h1
              className="
                text-2xl
                font-bold
              "
            >
              {user.displayName}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-4">
          {user.profileCompleted ? (
            <Badge variant="success">
              Perfil completo
            </Badge>
          ) : (
            <Badge variant="warning">
              Perfil pendiente
            </Badge>
          )}
        </div>
      </div>

      <div
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >
        <StatCard
          title="Racha actual"
          value={
            user.stats
              ?.currentStreak || 0
          }
        />

        <StatCard
          title="Mejor racha"
          value={
            user.stats
              ?.bestStreak || 0
          }
        />

        <StatCard
          title="Total días"
          value={
            user.stats
              ?.totalDays || 0
          }
        />
      </div>
    </div>
  );
}