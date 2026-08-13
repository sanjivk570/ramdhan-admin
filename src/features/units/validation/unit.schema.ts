import { z } from "zod";

export const unitSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Unit name must be at least 2 characters")
    .max(100, "Unit name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(1, "Unit code is required")
    .max(20, "Unit code cannot exceed 20 characters"),

  symbol: z
    .string()
    .trim()
    .min(1, "Unit symbol is required")
    .max(20, "Unit symbol cannot exceed 20 characters"),

  decimal_places: z
    .number()
    .int("Decimal places must be a whole number")
    .min(0, "Decimal places cannot be negative")
    .max(6, "Decimal places cannot exceed 6"),

  is_active: z.boolean(),

  sort_order: z
    .number()
    .int("Sort order must be a whole number")
    .min(0, "Sort order cannot be negative"),
});

export type UnitFormData = z.infer<typeof unitSchema>;
