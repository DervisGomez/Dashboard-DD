import {
  LayoutDashboard,
  Users,
  Church,
  Shield,
} from "lucide-react";

import { AdminRole } from "@/types/admin";

export const dashboardNavigation = [
  {
    label: "Dashboard",
    title: "Dashboard",
    description: "Bienvenido al panel de Devoción Diaria.",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: [AdminRole.SUPER_ADMIN, AdminRole.ADMIN_CHURCH],
  },
  {
    label: "Usuarios",
    title: "Usuarios",
    description:
      "Gestiona y explora los usuarios registrados en la aplicación.",
    href: "/users",
    icon: Users,
    roles: [AdminRole.SUPER_ADMIN, AdminRole.ADMIN_CHURCH],
  },
  {
    label: "Iglesias",
    title: "Iglesias",
    description:
      "Administra las iglesias y sus códigos de registro.",
    href: "/churches",
    icon: Church,
    roles: [AdminRole.SUPER_ADMIN],
  },
  {
    label: "Admins",
    title: "Administradores",
    description: "Gestión de cuentas con acceso al panel.",
    href: "/admins",
    icon: Shield,
    roles: [AdminRole.SUPER_ADMIN],
  },
];

const userDetailMeta = {
  title: "Detalle de usuario",
  description: "Perfil y estadísticas del usuario.",
};

export function getDashboardPageMeta(pathname: string): {
  title: string;
  description?: string;
} {
  if (/^\/users\/[^/]+$/.test(pathname)) {
    return userDetailMeta;
  }

  const match = dashboardNavigation.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  if (match) {
    return {
      title: match.title,
      description: match.description,
    };
  }

  return { title: "Devoción Diaria" };
}
