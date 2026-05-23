import {
    LayoutDashboard,
    Users,
    Church,
    Shield,
  } from "lucide-react";
  
  import { AdminRole }
    from "@/types/admin";
  
  export const dashboardNavigation = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
  
      roles: [
        AdminRole.SUPER_ADMIN,
        AdminRole.ADMIN_CHURCH,
      ],
    },
  
    {
      label: "Usuarios",
      href: "/users",
      icon: Users,
  
      roles: [
        AdminRole.SUPER_ADMIN,
        AdminRole.ADMIN_CHURCH,
      ],
    },
  
    {
      label: "Iglesias",
      href: "/churches",
      icon: Church,
  
      roles: [
        AdminRole.SUPER_ADMIN,
      ],
    },
  
    {
      label: "Admins",
      href: "/admins",
      icon: Shield,
  
      roles: [
        AdminRole.SUPER_ADMIN,
      ],
    },
  ];