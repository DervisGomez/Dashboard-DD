"use client";

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

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData
  ) {
    try {
      await loginUser(
        data.email,
        data.password
      );
  
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <input
          type="email"
          placeholder="Correo"
          {...register("email")}
          className="border p-2"
        />

        {errors.email && (
          <p>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
          className="border p-2"
        />

        {errors.password && (
          <p>
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black px-4 py-2 text-white"
      >
        Ingresar
      </button>
    </form>
  );
}