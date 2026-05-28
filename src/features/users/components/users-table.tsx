"use client";

import {
  CheckCircle2,
  CircleAlert,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { AppUser } from "@/types/user";

import { AvatarInitials } from "@/components/ui/avatar-initials";

import { IconButton } from "@/components/ui/icon-button";

import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeadCell,
  AdminTableHeadRow,
  AdminTableRow,
} from "@/components/ui/admin-table";
import { getVisibleCurrentStreak } from "@/features/users/lib/get-visible-current-streak";

import { cn } from "@/lib/utils";

interface UsersTableProps {
  users: AppUser[];
}

function StatValue({ value }: { value: number | undefined }) {
  if (value === undefined || value === null) {
    return (
      <span className="font-normal text-zinc-300" aria-hidden>
        —
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex min-w-[1.5rem] justify-center font-medium
        tabular-nums text-zinc-800
      "
    >
      {value}
    </span>
  );
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  function goToUserDetail(userId: string) {
    router.push(`/users/${userId}`);
  }

  return (
    <AdminTable minWidth="680px">
      <AdminTableHead>
        <AdminTableHeadRow>
          <AdminTableHeadCell className="min-w-[240px]">
            Usuario
          </AdminTableHeadCell>
          <AdminTableHeadCell
            align="center"
            className="hidden w-28 sm:table-cell"
          >
            Racha
          </AdminTableHeadCell>
          <AdminTableHeadCell
            align="center"
            className="hidden w-28 md:table-cell"
          >
            Mejor racha
          </AdminTableHeadCell>
          <AdminTableHeadCell
            align="center"
            className="hidden w-28 md:table-cell"
          >
            Total días
          </AdminTableHeadCell>
          <AdminTableHeadCell align="center" className="w-14" />
        </AdminTableHeadRow>
      </AdminTableHead>

      <AdminTableBody>
        {users.map((user) => {
          const streak = getVisibleCurrentStreak({
            currentStreak: user.stats?.currentStreak,
            lastDevotionalDate: user.stats?.lastDevotionalDate,
          });
          const best = user.stats?.bestStreak;
          const total = user.stats?.totalDays;

          return (
            <AdminTableRow
              key={user.id}
              role="link"
              tabIndex={0}
              onClick={() => goToUserDetail(user.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  goToUserDetail(user.id);
                }
              }}
              className="
                cursor-pointer focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-inset
                focus-visible:ring-[#2e7d32]/25
              "
            >
              <AdminTableCell className="!h-auto py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <AvatarInitials
                    name={user.displayName || user.email}
                    size="sm"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {user.displayName}
                      </p>
                      {user.profileCompleted ? (
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-[#2e7d32]"
                          aria-label="Perfil completo"
                        />
                      ) : (
                        <CircleAlert
                          size={14}
                          className="shrink-0 text-amber-500"
                          aria-label="Perfil pendiente"
                        />
                      )}
                    </div>
                    <p className="truncate text-xs text-zinc-500">
                      {user.email}
                    </p>

                    <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 sm:hidden">
                      <div className="flex items-baseline gap-1.5">
                        <dt className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                          Racha
                        </dt>
                        <dd className="text-xs font-medium tabular-nums text-zinc-700">
                          {streak ?? "—"}
                        </dd>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <dt className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                          Mejor
                        </dt>
                        <dd className="text-xs font-medium tabular-nums text-zinc-700">
                          {best ?? "—"}
                        </dd>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <dt className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                          Total
                        </dt>
                        <dd className="text-xs font-medium tabular-nums text-zinc-700">
                          {total ?? "—"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </AdminTableCell>

              <AdminTableCell
                align="center"
                className="hidden sm:table-cell"
              >
                <StatValue value={streak} />
              </AdminTableCell>

              <AdminTableCell
                align="center"
                className="hidden md:table-cell"
              >
                <StatValue value={best} />
              </AdminTableCell>

              <AdminTableCell
                align="center"
                className="hidden md:table-cell"
              >
                <StatValue value={total} />
              </AdminTableCell>

              <AdminTableCell align="center" className="!px-3">
                <IconButton
                  href={`/users/${user.id}`}
                  label="Ver detalle"
                  className={cn(
                    `
                      opacity-0 group-hover:opacity-100
                      group-focus-within:opacity-100
                      hover:!bg-[#2e7d32]/10 hover:!text-[#276c2c]
                      sm:opacity-100
                    `
                  )}
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </IconButton>
              </AdminTableCell>
            </AdminTableRow>
          );
        })}
      </AdminTableBody>
    </AdminTable>
  );
}
