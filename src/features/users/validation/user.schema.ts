import { z } from "zod";

export const userSchema = z
    .object({
        first_name: z
            .string()
            .trim()
            .min(2, "First name must be at least 2 characters")
            .max(100, "First name cannot exceed 100 characters"),

        last_name: z
            .string()
            .trim()
            .max(100, "Last name cannot exceed 100 characters")
            .optional()
            .or(z.literal("")),

        email: z
            .string()
            .trim()
            .email("Please enter a valid email address"),

        country_code: z
            .string()
            .min(1, "Country code is required"),

        mobile: z
            .string()
            .trim()
            .regex(
                /^[0-9]{7,15}$/,
                "Mobile number must contain 7 to 15 digits"
            )
            .optional()
            .or(z.literal("")),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .regex(
                /[0-9]/,
                "Password must contain at least one number"
            )
            .regex(
                /[@$!%*?&]/,
                "Password must contain at least one special character"
            ),

        password_confirmation: z
            .string()
            .min(1, "Please confirm your password"),

        role: z
            .string()
            .min(1, "Please select a role"),

        // is_active: z.boolean(),
        is_active: z.union([ z.literal(0), z.literal(1), ]),
    })
    .refine(
        (data) =>
            data.password === data.password_confirmation,
        {
            message: "Passwords do not match",
            path: ["password_confirmation"],
        }
    );

export type UserFormData = z.infer<typeof userSchema>;