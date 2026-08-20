import { z } from "zod";

export const taxClassSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(150, "Name cannot exceed 150 characters"),

    code: z
        .string()
        .trim()
        .min(2, "Code must be at least 2 characters")
        .max(100, "Code cannot exceed 100 characters")
        .regex(
            /^[A-Za-z0-9_-]+$/,
            "Code may contain only letters, numbers, underscores and hyphens"
        ),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .or(z.literal("")),

    is_active: z.boolean(),

    sort_order: z.coerce
        .number()
        .int("Sort order must be a whole number")
        .min(0, "Sort order cannot be negative"),
});

export type TaxClassFormData = z.infer<typeof taxClassSchema>;
