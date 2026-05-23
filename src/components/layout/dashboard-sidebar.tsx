"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  dashboardNavigation,
} from "@/constants/navigation";

import { cn }
  from "@/lib/utils";

import {
  useAuth,
} from "@/features/auth/context/auth-context";

export function DashboardSidebar() {
  const pathname = usePathname();

  const { user } = useAuth();

  const role =
    user?.adminData.role;

  const filteredNavigation =
    dashboardNavigation.filter(
      (item) =>
        role &&
        item.roles.includes(role)
    );

  return (
    <aside
      className="
        hidden
        w-64
        border-r
        bg-white
        p-4
        md:block
      "
    >
      <div className="mb-10">
        <h2 className="text-xl font-bold">
          Devoción Admin
        </h2>
      </div>

      <nav className="space-y-2">
        {filteredNavigation.map(
          (item) => {
            const isActive =
              pathname === item.href;

            const Icon =
              item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    transition-colors
                  `,
                  isActive
                    ? `
                      bg-black
                      text-white
                    `
                    : `
                      hover:bg-gray-100
                    `
                )}
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
}