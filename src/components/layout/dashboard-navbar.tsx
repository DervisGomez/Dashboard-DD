"use client";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/features/auth/context/auth-context";

export function DashboardNavbar() {
  const router = useRouter();

  const { user, logout } =
    useAuth();

  async function handleLogout() {
    await logout();

    router.push("/login");
  }

  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-white
        px-6
      "
    >
      <div>
        <p className="font-medium">
          {user?.adminData.displayName}
        </p>

        <p className="text-sm text-gray-500">
          {user?.adminData.role}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="
          rounded
          bg-black
          px-4
          py-2
          text-white
        "
      >
        Salir
      </button>
    </header>
  );
}