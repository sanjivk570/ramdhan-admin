import { z } from "zod";

export const taxRateSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(150, "Name cannot exceed 150 characters"),

    rate: z.coerce
        .number()
        .min(0, "Rate cannot be negative")
        .max(100, "Rate cannot exceed 100%"),

    tax_class_uuid: z
        .string()
        .min(1, "Please select a tax class"),

    country_code: z
        .string()
        .trim()
        .max(10, "Country code cannot exceed 10 characters")
        .optional()
        .or(z.literal("")),

    state_code: z
        .string()
        .trim()
        .max(20, "State code cannot exceed 20 characters")
        .optional()
        .or(z.literal("")),

    priority: z.coerce
        .number()
        .int("Priority must be a whole number")
        .min(0, "Priority cannot be negative"),

    is_active: z.boolean(),
});

export type TaxRateFormData = z.infer<typeof taxRateSchema>;
