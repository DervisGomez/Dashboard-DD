import { z } from "zod";

export const churchSchema = z.object({
  name: z
    .string()
    .min(3, "Nombre requerido"),

  city: z
    .string()
    .min(2, "Ciudad requerida"),

  country: z
    .string()
    .min(2, "País requerido"),

  code: z
    .string()
    .min(3, "Código requerido"),
});

export type ChurchSchema = z.infer<typeof churchSchema>;
