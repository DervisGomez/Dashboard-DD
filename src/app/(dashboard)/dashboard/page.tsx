import {
    ProtectedRoute,
  } from "@/features/auth/components/protected-route";
  
  export default function DashboardPage() {
    return (
      <ProtectedRoute>
        <main className="p-10">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
        </main>
      </ProtectedRoute>
    );
  }