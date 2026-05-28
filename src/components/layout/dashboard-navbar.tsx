"use client";

import Link from "next/link";
import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";

import { useAuth } from "@/features/auth/context/auth-context";

import { AdminRole } from "@/types/admin";

import { AvatarInitials } from "@/components/ui/avatar-initials";

import {
  dashboardNavigation,
  getDashboardPageMeta,
} from "@/constants/navigation";

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
  const router = useRouter();
  const { user, logout } = useAuth();
  const { title, description } =
    getDashboardPageMeta(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const role = user?.adminData.role;
  const filteredNavigation = dashboardNavigation.filter(
    (item) => role && item.roles.includes(role)
  );

  async function handleMobileLogout() {
    const confirmed = window.confirm(
      "¿Deseas cerrar sesión?"
    );

    if (!confirmed) {
      return;
    }

    await logout();
    setIsMobileMenuOpen(false);
    router.push("/login");
  }

  return (
    <>
      <header
        className="
          sticky top-0 z-20 flex min-h-14 shrink-0 items-center
          justify-between gap-4 border-b border-zinc-200/80 py-3
          bg-white/80 px-4 backdrop-blur-md
          supports-[backdrop-filter]:bg-white/70
          sm:px-6
        "
      >
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              `
                mt-0.5 inline-flex h-8 w-8 shrink-0 cursor-pointer
                items-center justify-center rounded-md text-zinc-600
                hover:bg-zinc-100 hover:text-zinc-900 md:hidden
              `,
              ui.transition,
              ui.focusRing
            )}
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>

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

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-zinc-900/35"
            aria-label="Cerrar menú"
          />

          <aside
            className="
              absolute left-0 top-0 h-full w-72 max-w-[85vw]
              border-r border-zinc-200/80 bg-white p-4
              shadow-xl
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">
                Menú
              </p>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  `
                    inline-flex h-8 w-8 cursor-pointer
                    items-center justify-center rounded-md
                    text-zinc-500 hover:bg-zinc-100
                  `,
                  ui.transition,
                  ui.focusRing
                )}
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1">
              {filteredNavigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      `
                        flex h-10 items-center gap-3 rounded-lg px-2.5
                        text-sm font-medium
                      `,
                      ui.transition,
                      ui.focusRing,
                      isActive
                        ? "bg-[#2e7d32]/10 text-[#1b5e20]"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500">
                      <Icon size={16} />
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={handleMobileLogout}
                className={cn(
                  `
                    inline-flex h-10 w-full cursor-pointer items-center gap-3
                    rounded-lg px-2.5 text-sm font-medium text-zinc-600
                    hover:bg-zinc-50 hover:text-zinc-900
                  `,
                  ui.transition,
                  ui.focusRing
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500">
                  <LogOut size={16} />
                </span>
                Salir
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
