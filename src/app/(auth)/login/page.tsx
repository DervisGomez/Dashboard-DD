import {
  GuestRoute,
} from "@/features/auth/components/guest-route";

import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <GuestRoute>
      <main
        className="
          flex min-h-screen items-center justify-center
          bg-background px-4 py-12
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-[color-mix(in_srgb,var(--primary)_18%,transparent)] via-transparent to-transparent
          "
          aria-hidden
        />

        <div className="relative w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </GuestRoute>
  );
}
