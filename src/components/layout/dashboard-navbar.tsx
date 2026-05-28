"use client";

import { usePathname } from "next/navigation";

import { useAuth } from "@/features/auth/context/auth-context";

import { AdminRole } from "@/types/admin";

import { AvatarInitials } from "@/components/ui/avatar-initials";

import { getDashboardPageMeta } from "@/constants/navigation";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

function formatRole(role: AdminRole): string {
  switch (role) {
    case AdminRole.SUPER_ADMIN:
      return "Super administrador";
    case AdminRole.ADMIN_CHURCH:
      return "Administrador de iglesia";
    default:
      return role;
  }
}

export function DashboardNavbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { title, description } =
    getDashboardPageMeta(pathname);

  return (
    <header
      className="
        sticky top-0 z-20 flex min-h-14 shrink-0 items-center
        justify-between gap-4 border-b border-zinc-200/80 py-3
        bg-white/80 px-4 backdrop-blur-md
        supports-[backdrop-filter]:bg-white/70
        sm:px-6
      "
    >
      <div className="min-w-0 flex-1">
        <h1
          className={cn(
            ui.pageTitle,
            "truncate text-lg sm:text-xl"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className="
              mt-0.5 hidden truncate text-xs text-zinc-500
              sm:block
            "
          >
            {description}
          </p>
        )}
      </div>

      {user && (
        <div
          className="
            flex shrink-0 max-w-[200px] items-center gap-2.5
            rounded-lg border border-zinc-200/80 bg-zinc-50/80
            py-1 pl-1 pr-3 sm:max-w-none
          "
        >
          <AvatarInitials
            name={
              user.adminData.displayName ||
              user.adminData.email
            }
            size="sm"
          />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-[13px] font-medium text-zinc-900">
              {user.adminData.displayName ||
                user.adminData.email}
            </p>
            <p className="truncate text-[11px] text-zinc-500">
              {formatRole(user.adminData.role)}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
