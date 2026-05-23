import {
    ProtectedRoute,
  } from "@/features/auth/components/protected-route";
  
  import {
    DashboardSidebar,
  } from "@/components/layout/dashboard-sidebar";
  
  import {
    DashboardNavbar,
  } from "@/components/layout/dashboard-navbar";
  
  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen">
          <DashboardSidebar />
  
          <div className="flex flex-1 flex-col">
            <DashboardNavbar />
  
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </ProtectedRoute>
    );
  }