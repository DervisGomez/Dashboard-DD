"use client";

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { BookOpen, LogOut, Sparkles } from "lucide-react";

import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/constants/navigation";

import { cn } from "@/lib/utils";

import { ui } from "@/lib/ui-tokens";

import { useAuth } from "@/features/auth/context/auth-context";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const role = user?.adminData.role;
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] =
    useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredNavigation = dashboardNavigation.filter(
    (item) => role && item.roles.includes(role)
  );

  async function handleConfirmLogout() {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  }

  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-30 hidden h-screen w-60
        flex-col overflow-hidden border-r border-zinc-200/70
        bg-white md:flex
      "
    >
      {/* Branding */}
      <div className="shrink-0 px-3 pt-4 pb-3">
        <Link
          href="/dashboard"
          className={cn(
            `
              group flex items-center gap-3 rounded-xl px-2 py-2
              hover:bg-zinc-50
            `,
            ui.focusRing
          )}
        >
          <div
            className="
              relative flex h-9 w-9 shrink-0 items-center
              justify-center rounded-[10px] bg-gradient-to-br
              from-[#2e7d32] via-[#2e7d32] to-[#43a047]
              text-white shadow-[0_1px_2px_rgba(46,125,50,0.4)]
              ring-1 ring-[#2e7d32]/20
              transition-transform duration-200 ease-out
              group-hover:scale-[1.02]
            "
          >
            <BookOpen size={17} strokeWidth={2.25} />
            <span
              className="
                pointer-events-none absolute -right-0.5 -top-0.5
                h-2 w-2 rounded-full bg-[#66bb6a]
                ring-2 ring-white
              "
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold tracking-tight text-zinc-900">
              Devoción Diaria
            </p>
            <p className="truncate text-[11px] font-medium text-zinc-500">
              Administración
            </p>
          </div>
        </Link>
      </div>

      {/* Navegación */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-3">
        <p className={cn(ui.overline, "mb-2 px-2")}>Menú</p>

        <nav className="flex flex-col gap-0.5">
          {filteredNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `
                    group relative flex h-9 items-center gap-3
                    rounded-lg px-2.5 text-[13px] font-medium
                  `,
                  ui.transition,
                  ui.focusRing,
                  isActive
                    ? "bg-[#2e7d32]/[0.07] text-[#1b5e20]"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                {isActive && (
                  <span
                    className="
                      absolute left-0 top-1/2 h-5 w-[3px]
                      -translate-y-1/2 rounded-r-full bg-[#2e7d32]
                    "
                    aria-hidden
                  />
                )}

                <span
                  className={cn(
                    `
                      flex h-7 w-7 shrink-0 items-center
                      justify-center rounded-md
                    `,
                    ui.transition,
                    isActive
                      ? "bg-[#2e7d32]/10 text-[#2e7d32]"
                      : "text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-600"
                  )}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.25 : 2}
                  />
                </span>

                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setIsLogoutDialogOpen(true)}
            className={cn(
              `
                group relative mt-1 flex h-9 w-full
                items-center gap-3 rounded-lg px-2.5
                cursor-pointer text-left text-[13px]
                font-medium text-zinc-600
              `,
              ui.transition,
              ui.focusRing,
              "hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <span
              className="
                flex h-7 w-7 shrink-0 items-center justify-center
                rounded-md text-zinc-400 transition-colors duration-200
                group-hover:bg-zinc-100 group-hover:text-zinc-600
              "
            >
              <LogOut size={16} strokeWidth={2} />
            </span>
            <span className="truncate">Salir</span>
          </button>
        </nav>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-zinc-100 p-3">
        <div
          className="
            rounded-xl border border-zinc-200/60 bg-gradient-to-br
            from-zinc-50 to-white p-3
            shadow-[0_1px_2px_rgba(0,0,0,0.03)]
          "
        >
          <div className="flex items-start gap-2.5">
            <div
              className="
                flex h-7 w-7 shrink-0 items-center justify-center
                rounded-lg bg-[#2e7d32]/10 text-[#2e7d32]
              "
            >
              <Sparkles size={14} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold leading-snug text-zinc-700">
                Panel administrativo
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-zinc-500">
                Gestiona usuarios, iglesias y métricas de tu comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLogoutDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <button
            type="button"
            className="absolute inset-0 bg-zinc-900/35 backdrop-blur-[1px]"
            onClick={() => setIsLogoutDialogOpen(false)}
            aria-label="Cerrar diálogo"
          />

          <div
            className="
              relative w-full max-w-sm rounded-2xl border border-zinc-200/80
              bg-white p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)]
              ring-1 ring-zinc-950/[0.05]
            "
          >
            <div className="mb-4 flex items-start gap-3">
              <div
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl bg-amber-50 text-amber-600
                "
                aria-hidden
              >
                <LogOut size={16} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h2
                  id="logout-dialog-title"
                  className="text-sm font-semibold text-zinc-900"
                >
                  ¿Deseas cerrar sesión?
                </h2>
                <p
                  id="logout-dialog-description"
                  className="mt-1 text-[13px] leading-relaxed text-zinc-500"
                >
                  Se cerrará tu sesión actual y tendrás que volver a iniciar
                  sesión para acceder al panel.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(false)}
                className={cn(
                  `
                    h-9 rounded-lg border border-zinc-200/80 bg-white px-3
                    text-sm font-medium text-zinc-600
                  `,
                  ui.transition,
                  ui.focusRing,
                  "hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className={cn(
                  `
                    h-9 rounded-lg bg-[#2e7d32] px-3 text-sm font-medium
                    text-white shadow-sm
                    disabled:cursor-not-allowed disabled:opacity-70
                  `,
                  ui.transition,
                  ui.focusRing,
                  "hover:bg-[#276c2c]"
                )}
              >
                {isLoggingOut ? "Cerrando..." : "Sí, cerrar sesión"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
