"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  churchSchema,
  ChurchSchema,
} from "@/schemas/church.schema";

import {
  createChurch,
} from "@/services/churches/create-church";

import { Input }
  from "@/components/ui/input";

import { Button }
  from "@/components/ui/button";

interface ChurchFormProps {
  onSuccess?: () => void;
}

export function ChurchForm({
  onSuccess,
}: ChurchFormProps) {
  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ChurchSchema>({
    resolver:
      zodResolver(
        churchSchema
      ),
  });

  async function onSubmit(
    data: ChurchSchema
  ) {
    try {
      await createChurch(data);

      reset();

      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Nombre de la iglesia"
        placeholder="Ej. Iglesia Central"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Ciudad"
        placeholder="Ej. Bogotá"
        error={errors.city?.message}
        {...register("city")}
      />

      <Input
        label="País"
        placeholder="Ej. Colombia"
        error={errors.country?.message}
        {...register("country")}
      />

      <Input
        label="Código de iglesia"
        placeholder="Ej. CENTRAL01"
        error={errors.code?.message}
        {...register("code")}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting
          ? "Guardando..."
          : "Crear iglesia"}
      </Button>
    </form>
  );
}
