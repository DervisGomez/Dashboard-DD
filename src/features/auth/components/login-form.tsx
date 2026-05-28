"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver }
  from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "@/schemas/login.schema";

import { useRouter }
  from "next/navigation";

import {
  loginUser,
} from "@/services/auth/login";

import { Input }
  from "@/components/ui/input";

import { Button }
  from "@/components/ui/button";

import {
  getFirebaseAuthErrorMessage,
} from "@/lib/firebase-auth-errors";

export function LoginForm() {
  const router = useRouter();

  const [authError, setAuthError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    setAuthError(null);

    try {
      await loginUser(
        data.email,
        data.password
      );

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setAuthError(
        getFirebaseAuthErrorMessage(error)
      );
    }
  }

  return (
    <div
      className="ui-card w-full max-w-md p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-8 text-center">
        <div
          className="
            mx-auto mb-4 flex h-12 w-12 items-center
            justify-center rounded-xl bg-gradient-to-br
            from-[var(--primary)] to-[var(--primary-tint)] text-lg
            font-bold text-white shadow-sm
          "
        >
          DD
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Devoción Diaria
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Accede al panel administrativo para gestionar
          tu comunidad con serenidad.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {authError && (
          <div
            className="
              rounded-lg border border-red-200 bg-red-50
              px-4 py-3 text-sm leading-relaxed text-red-800
            "
            role="alert"
          >
            {authError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Ingresando..."
            : "Ingresar"}
        </Button>
      </form>
    </div>
  );
}
