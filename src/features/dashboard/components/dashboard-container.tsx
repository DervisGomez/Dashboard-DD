"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  AvatarInitials,
} from "@/components/ui/avatar-initials";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import {
  useAuth,
} from "@/features/auth/context/auth-context";
import {
  getChurchDashboardStats,
} from "@/services/dashboard/get-church-dashboard-stats";
import { getChurchById } from "@/services/churches/get-church-by-id";
import {
  ChurchDashboardStats,
  ChurchDashboardHighlights,
  ChurchDashboardTopUser,
} from "@/services/dashboard/types";
import {
  AdminRole,
} from "@/types/admin";
import { Church } from "@/types/church";

const EMPTY_STATS: ChurchDashboardStats = {
  usersTotal: 0,
  usersProfileCompleted: 0,
  usersProfilePending: 0,
  devotionalTotalDays: 0,
  prayerActiveCount: 0,
  prayerAnsweredCount: 0,
  prayerArchivedCount: 0,
  prayerTotalCount: 0,
  prayerTotalResponses: 0,
};

const EMPTY_HIGHLIGHTS: ChurchDashboardHighlights = {
  topBestStreakUser: null,
  topDevotionalDaysUser: null,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CO").format(value);
}

function getPercent(value: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

interface DashboardLeaderBlockProps {
  title: string;
  emptyLabel: string;
  unit: string;
  user: ChurchDashboardTopUser | null;
  emoji: string;
}

function DashboardLeaderBlock({
  title,
  emptyLabel,
  unit,
  user,
  emoji,
}: DashboardLeaderBlockProps) {
  return (
    <div className="rounded-lg bg-zinc-50/80 px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-zinc-500">
            {title}
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
            {user ? formatNumber(user.value) : "0"}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {unit}
          </p>
        </div>

        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[15px]"
          aria-hidden
        >
          {emoji}
        </div>
      </div>

      <div className="mt-3 pt-1">
        {user ? (
          <Link
            href={`/users/${user.userId}`}
            className="
              group flex items-center justify-between gap-3 rounded-lg
              px-2 py-1.5 transition-colors hover:bg-zinc-50
            "
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <AvatarInitials
                name={user.displayName || user.email}
                size="sm"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {user.displayName}
                </p>
                {user.email && (
                  <p className="truncate text-xs text-zinc-500">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <ArrowUpRight
              size={14}
              className="text-zinc-400 group-hover:text-zinc-600"
              aria-hidden
            />
          </Link>
        ) : (
          <p className="text-sm text-zinc-500">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-32 animate-pulse rounded-xl border border-zinc-200/70 bg-white" />
      <div className="grid gap-3 xl:grid-cols-12">
        <div className="h-64 animate-pulse rounded-xl border border-zinc-200/70 bg-white xl:col-span-8" />
        <div className="h-64 animate-pulse rounded-xl border border-zinc-200/70 bg-white xl:col-span-4" />
      </div>
      <div className="h-28 animate-pulse rounded-xl border border-zinc-200/70 bg-white" />
    </div>
  );
}

function ActivityFeedItem({
  emoji,
  title,
  description,
  value,
}: {
  emoji?: string;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <li className="relative flex gap-3 pb-3 last:pb-0">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-[14px]"
        aria-hidden
      >
        {emoji}
      </span>
      <div className="min-w-0">
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900">
          <span>{title}</span>
        </p>
        <p className="text-xs text-zinc-500">{description}</p>
        <p className="mt-1 text-xs font-medium text-zinc-700">{value}</p>
      </div>
    </li>
  );
}

export function DashboardContainer() {
  const { user } = useAuth();

  const [stats, setStats] =
    useState<ChurchDashboardStats>(EMPTY_STATS);
  const [highlights, setHighlights] =
    useState<ChurchDashboardHighlights>(
      EMPTY_HIGHLIGHTS
    );
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState<string | null>(null);
  const [church, setChurch] = useState<Church | null>(null);

  const admin = user?.adminData;
  const isChurchAdmin =
    admin?.role === AdminRole.ADMIN_CHURCH;
  const profileCompletedPercent =
    getPercent(
      stats.usersProfileCompleted,
      stats.usersTotal
    );

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      if (!admin) {
        return;
      }

      if (!isChurchAdmin) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result =
          await getChurchDashboardStats(
            admin.churchId
          );

        if (!isMounted) {
          return;
        }

        setStats(result.stats);
        setHighlights(
          result.highlights ?? EMPTY_HIGHLIGHTS
        );

        if (admin.churchId) {
          const churchData = await getChurchById(admin.churchId);
          if (isMounted) {
            setChurch(churchData);
          }
        }
      } catch (loadError) {
        console.error(loadError);

        if (isMounted) {
          setError(
            "No pudimos cargar las estadísticas de la iglesia."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [admin, isChurchAdmin]);

  if (!isChurchAdmin) {
    return (
      <div className="space-y-4">
        <div
          className="
            rounded-xl border border-zinc-200/70 bg-white p-5
            shadow-sm ring-1 ring-zinc-950/[0.03]
          "
        >
          <h2 className="text-base font-semibold text-zinc-900">
            Resumen general
          </h2>
          <p className="text-sm text-muted-foreground">
            Las estadísticas por iglesia están disponibles para usuarios ADMIN_CHURCH.
          </p>
        </div>
      </div>
    );
  }

  const completionBadgeVariant =
    profileCompletedPercent >= 70 ? "success" : "warning";
  const churchStatusVariant =
    stats.usersTotal > 0 ? "success" : "default";
  const churchLocation = church
    ? [church.city, church.country].filter(Boolean).join(", ")
    : "";

  const activityItems = [
    {
      id: "profiles",
      title: "Perfiles completados",
      emoji: "🟢",
      description: `${formatNumber(stats.usersProfileCompleted)} de ${formatNumber(stats.usersTotal)} usuarios`,
      value: `${profileCompletedPercent}%`,
    },
    {
      id: "devotionals",
      title: "Actividad devocional",
      emoji: "📖",
      description: `${formatNumber(stats.devotionalTotalDays)} días acumulados`,
      value: `${formatNumber(stats.usersProfilePending)} perfiles pendientes`,
    },
    {
      id: "prayer-responses",
      title: "Respuestas de oración",
      emoji: "🙏",
      description: `${formatNumber(stats.prayerTotalResponses)} respuestas registradas`,
      value: `${formatNumber(stats.prayerAnsweredCount)} motivos respondidos`,
    },
    {
      id: "streak",
      title: "Racha destacada",
      emoji: "🔥",
      description: highlights.topBestStreakUser
        ? highlights.topBestStreakUser.displayName
        : "Sin rachas registradas",
      value: highlights.topBestStreakUser
        ? `${formatNumber(highlights.topBestStreakUser.value)} días`
        : "0 días",
    },
  ];

  return (
    <div className="space-y-3">
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <Surface className="p-4">
          <p className="text-sm text-destructive">{error}</p>
        </Surface>
      ) : (
        <>
          <Surface className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2e7d32]/10 text-[#2e7d32]">
                  <span aria-hidden className="text-[17px]">⛪</span>
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-base font-semibold tracking-tight text-zinc-900">
                      {church?.name || "Tu iglesia"}
                    </p>
                    <Badge variant={churchStatusVariant}>
                      {stats.usersTotal > 0 ? "Activa" : "Inicial"}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    Contexto de gestión de tu comunidad
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                    {churchLocation && (
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden>📍</span>
                        {churchLocation}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden>👥</span>
                      {formatNumber(stats.usersTotal)} miembros
                    </span>
                    {church?.code && (
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden>✨</span>
                        Código {church.code}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="self-start rounded-md bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600">
                Tenant activo
              </div>
            </div>
          </Surface>

          <Surface className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold tracking-tight text-zinc-900">
                    Vista general de actividad
                  </p>
                  <Badge variant={completionBadgeVariant}>
                    {profileCompletedPercent}% perfiles completos
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {formatNumber(stats.usersTotal)} usuarios,{" "}
                  {formatNumber(stats.devotionalTotalDays)} días devocionales y{" "}
                  {formatNumber(stats.prayerTotalResponses)} respuestas de oración.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
                <div className="px-1 py-0.5">
                  <p className="text-[11px] text-zinc-500">Usuarios</p>
                  <p className="text-lg font-semibold tracking-tight text-zinc-900">
                    {formatNumber(stats.usersTotal)}
                  </p>
                </div>
                <div className="px-1 py-0.5">
                  <p className="text-[11px] text-zinc-500">Devocionales</p>
                  <p className="text-lg font-semibold tracking-tight text-zinc-900">
                    {formatNumber(stats.devotionalTotalDays)}
                  </p>
                </div>
                <div className="px-1 py-0.5">
                  <p className="text-[11px] text-zinc-500">Activas</p>
                  <p className="text-lg font-semibold tracking-tight text-zinc-900">
                    {formatNumber(stats.prayerActiveCount)}
                  </p>
                </div>
                <div className="px-1 py-0.5">
                  <p className="text-[11px] text-zinc-500">Respuestas</p>
                  <p className="text-lg font-semibold tracking-tight text-zinc-900">
                    {formatNumber(stats.prayerTotalResponses)}
                  </p>
                </div>
              </div>
            </div>
          </Surface>

          <section className="grid gap-3 xl:grid-cols-12">
            <Surface className="p-4 xl:col-span-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-900">
                  Insights clave
                </p>
                <Badge variant="default">
                  {formatNumber(stats.usersProfilePending)} pendientes
                </Badge>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <DashboardLeaderBlock
                  title="Mejor racha"
                  unit="días consecutivos"
                  emptyLabel="Aún no hay rachas registradas."
                  user={highlights.topBestStreakUser}
                  emoji="🏆"
                />
                <DashboardLeaderBlock
                  title="Más devocionales"
                  unit="días registrados"
                  emptyLabel="Aún no hay devocionales registrados."
                  user={highlights.topDevotionalDaysUser}
                  emoji="🥇"
                />
              </div>

              <div className="mt-4 border-t border-zinc-100 pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <span aria-hidden className="text-sm">🙏</span>
                  <p className="text-sm font-medium text-zinc-800">
                    Estado de oración
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <p className="text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      {formatNumber(stats.prayerAnsweredCount)}
                    </span>{" "}
                    respondidas
                  </p>
                  <p className="text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      {formatNumber(stats.prayerArchivedCount)}
                    </span>{" "}
                    archivadas
                  </p>
                  <p className="text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      {formatNumber(stats.prayerTotalResponses)}
                    </span>{" "}
                    respuestas
                  </p>
                  <p className="text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      {formatNumber(stats.prayerActiveCount)}
                    </span>{" "}
                    activas
                  </p>
                </div>
              </div>
            </Surface>

            <Surface className="p-4 xl:col-span-4">
              <div className="mb-3 flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2e7d32]/10 text-[14px]"
                  aria-hidden
                >
                  ✨
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    Actividad reciente
                  </p>
                  <p className="text-xs text-zinc-500">
                    Insights rápidos del día
                  </p>
                </div>
              </div>

              <ul className="space-y-0">
                {activityItems.map((item) => (
                  <ActivityFeedItem
                    key={item.id}
                    emoji={item.emoji}
                    title={item.title}
                    description={item.description}
                    value={item.value}
                  />
                ))}
              </ul>
            </Surface>
          </section>

          <Surface className="p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  <span aria-hidden>💡 </span>
                  Consejo: revisa perfiles pendientes para mejorar retención inicial.
                </p>
              </div>
              <Link
                href="/users"
                className="
                  inline-flex items-center gap-1 text-xs font-medium
                  text-[#2e7d32] transition-colors hover:text-[#276c2c]
                "
              >
                Ir a usuarios
                <span aria-hidden>↗️</span>
              </Link>
            </div>
          </Surface>
        </>
      )}
    </div>
  );
}
