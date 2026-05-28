import { ProtectedRoute } from "@/features/auth/components/protected-route";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

import { DashboardNavbar } from "@/components/layout/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#fafafa]">
        <DashboardSidebar />

        <div className="flex min-h-screen min-w-0 flex-col md:pl-60">
          <DashboardNavbar />

          <main
            className="
              flex-1 overflow-y-auto px-4 py-6
              sm:px-8 sm:py-8
            "
          >
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
