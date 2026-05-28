"use client";

import {
  useEffect,
  useState,
} from "react";

import { Mail } from "lucide-react";

import {
  useParams,
} from "next/navigation";

import {
  useAuth,
} from "@/features/auth/context/auth-context";

import {
  getUserById,
} from "@/services/users/get-user-by-id";

import { AppUser } from "@/types/user";

import {
  AvatarInitials,
} from "@/components/ui/avatar-initials";

import {
  Badge,
} from "@/components/ui/badge";

import { BackLink } from "@/components/ui/back-link";

import { Surface } from "@/components/ui/surface";

import { StatsHeroCard } from "@/components/ui/stats-hero-card";

import { StatsProgressCard } from "@/components/ui/stats-progress-card";

import { StatsSectionTitle } from "@/components/ui/stats-section-title";

import { StatsSpiritualSummary } from "@/components/ui/stats-spiritual-summary";

import { StatsSummaryCard } from "@/components/ui/stats-summary-card";
import { getVisibleCurrentStreak } from "@/features/users/lib/get-visible-current-streak";

import {
  getStreakMessage,
  getSpiritualSummaryLine,
  getPrayerSummaryLine,
  getMonthMessage,
  getYearMessage,
} from "@/lib/stats-messages";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

function daysInCurrentMonth(): number {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
}

function daysInCurrentYear(): number {
  const year = new Date().getFullYear();
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) ||
    year % 400 === 0;
  return isLeap ? 366 : 365;
}

function hasDevotionalStats(
  stats: AppUser["stats"]
): boolean {
  if (!stats) return false;
  return (
    (stats.totalDays ?? 0) > 0 ||
    (stats.currentStreak ?? 0) > 0
  );
}

function formatLastDevotional(date?: string): string {
  if (!date) return "";
  try {
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return date;
    return new Date(y, m - 1, d).toLocaleDateString(
      "es",
      { day: "numeric", month: "long", year: "numeric" }
    );
  } catch {
    return date;
  }
}

function UserDetailSkeleton() {
  return (
    <div className={cn("stats-container", ui.stackSection)}>
      <div className="user-detail-skeleton h-8 w-36 rounded-md" />
      <div className="user-detail-skeleton h-44 rounded-xl" />
      <div className="user-detail-skeleton h-72 rounded-xl" />
    </div>
  );
}

export function UserDetailContainer() {
  const params = useParams();
  const { user: adminUser } = useAuth();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        if (!adminUser) return;
        const data = await getUserById({
          id: params.id as string,
          role: adminUser.adminData.role,
          churchId: adminUser.adminData.churchId,
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
    return <UserDetailSkeleton />;
  }

  if (!user) {
    return (
      <div className="stats-container py-20 text-center">
        <p className={ui.sectionTitle}>
          Usuario no encontrado
        </p>
        <p className={cn(ui.sectionDescription, "mt-1")}>
          El registro no existe o no tienes permiso para verlo.
        </p>
        <div className="mt-6 flex justify-center">
          <BackLink href="/users">Volver a usuarios</BackLink>
        </div>
      </div>
    );
  }

  const displayName =
    user.displayName?.trim() || user.email;
  const streak = getVisibleCurrentStreak({
    currentStreak: user.stats?.currentStreak,
    lastDevotionalDate: user.stats?.lastDevotionalDate,
  });
  const monthDays = user.stats?.monthDays ?? 0;
  const yearDays = user.stats?.yearDays ?? 0;
  const prayerActive = user.prayerStats?.activeCount ?? 0;
  const lastDevotional = user.stats?.lastDevotionalDate;
  const hasStats = hasDevotionalStats(user.stats);

  return (
    <div className={cn("stats-container pb-8", ui.stackSection)}>
      <BackLink href="/users">Volver a usuarios</BackLink>

      {/* Perfil */}
      <Surface as="article" className="overflow-hidden p-0">
        <div
          className="
            relative h-24 bg-gradient-to-r
            from-[#2e7d32] to-[#43a047]
            sm:h-28
          "
        >
          <div
            className="
              absolute bottom-0 left-5 z-20 translate-y-1/2
              rounded-full border-[3px] border-white bg-white
              shadow-md sm:left-6
            "
          >
            <AvatarInitials
              name={displayName}
              className="!h-[4.5rem] !w-[4.5rem] !text-lg sm:!h-20 sm:!w-20 sm:!text-xl"
            />
          </div>

          <h1
            className="
              absolute bottom-3 left-[5.75rem] right-4 z-10
              truncate text-lg font-semibold tracking-tight text-white
              sm:bottom-4 sm:left-[7rem] sm:text-xl
            "
          >
            {displayName}
          </h1>
        </div>

        <div className="px-5 pb-5 pt-12 sm:px-6 sm:pb-6 sm:pt-5">
          <div className="sm:ml-[7rem]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
              <a
                href={`mailto:${user.email}`}
                className={cn(
                  `
                    inline-flex max-w-full items-center gap-2
                    rounded-lg border border-zinc-200/80 bg-zinc-50/80
                    px-2.5 py-1.5 text-sm text-zinc-600
                  `,
                  ui.transition,
                  ui.focusRing,
                  "hover:border-zinc-300 hover:bg-white hover:text-zinc-900"
                )}
              >
                <Mail
                  size={14}
                  className="shrink-0 text-zinc-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="truncate">{user.email}</span>
              </a>

              <div className="shrink-0">
                {user.profileCompleted ? (
                  <Badge variant="success">Perfil completo</Badge>
                ) : (
                  <Badge variant="warning">Perfil pendiente</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </Surface>

      {/* Estadísticas */}
      <Surface
        className={cn("stats-panel", ui.insetCard, ui.stackSection)}
      >
        <section className={ui.stackBlock}>
          <StatsSectionTitle title="Devocional" />

          {hasStats ? (
            <>
              <StatsHeroCard
                icon="🔥"
                value={streak}
                label="días seguidos"
                message={getStreakMessage(streak)}
                footnote={
                  lastDevotional
                    ? `Último devocional: ${formatLastDevotional(lastDevotional)}`
                    : undefined
                }
              />

              <StatsSpiritualSummary
                lines={[
                  getSpiritualSummaryLine(streak),
                  getPrayerSummaryLine(prayerActive),
                ]}
              />

              <div className="stats-progress-section">
                <StatsProgressCard
                  title="Este mes"
                  description={`${monthDays} ${monthDays === 1 ? "día" : "días"} este mes`}
                  value={monthDays}
                  max={daysInCurrentMonth()}
                  microcopy={getMonthMessage(monthDays)}
                />
                <StatsProgressCard
                  title="Este año"
                  description={`${yearDays} ${yearDays === 1 ? "día" : "días"} este año`}
                  value={yearDays}
                  max={daysInCurrentYear()}
                  microcopy={getYearMessage(yearDays)}
                  subtle
                />
              </div>

              <div className="stats-summary-grid">
                <StatsSummaryCard
                  icon="🏆"
                  value={user.stats?.bestStreak ?? 0}
                  label="Mejor racha"
                />
                <StatsSummaryCard
                  icon="📅"
                  value={user.stats?.totalDays ?? 0}
                  label="Total días"
                />
                <StatsSummaryCard
                  icon="📅"
                  value={monthDays}
                  label="Este mes"
                />
                <StatsSummaryCard
                  icon="🗓️"
                  value={yearDays}
                  label="Este año"
                />
              </div>
            </>
          ) : (
            <div className="stats-card stats-empty-card">
              <div className="stats-empty-icon" aria-hidden>
                📖
              </div>
              <h3>Sin estadísticas todavía</h3>
              <p className="stats-microcopy mx-auto mt-2 max-w-xs">
                Este usuario aún no ha registrado devocionales 🙏
              </p>
            </div>
          )}
        </section>

        <hr className="border-zinc-100" />

        <section className={ui.stackBlock}>
          <StatsSectionTitle
            title="Oración"
            icon="🙏"
            subtitle="Motivos activos y respuestas."
            secondary
          />

          <div className="stats-prayer-grid">
            <StatsSummaryCard
              icon="🙏"
              value={user.prayerStats?.activeCount ?? 0}
              label="Motivos activos"
              variant="prayer"
            />
            <StatsSummaryCard
              icon="🙌"
              value={user.prayerStats?.totalResponses ?? 0}
              label="Respuestas recibidas"
              variant="prayer"
            />
            <StatsSummaryCard
              icon="✅"
              value={user.prayerStats?.answeredCount ?? 0}
              label="Motivos respondidos"
              variant="prayer"
            />
          </div>
        </section>
      </Surface>
    </div>
  );
}
