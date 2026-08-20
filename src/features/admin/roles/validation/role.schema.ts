// import { z } from "zod";

// export const roleSchema = z.object({
//     name: z.string().min(2),
//     quard_name: z.string().optional(),
//     display_name: z.email(),
// });

// export type RoleFormData = z.infer<typeof roleSchema>;

import { z } from "zod";

export const roleSchema = z.object({

    name: z
        .string()
        .trim()
        .min(
            2,
            "Role name must be at least 2 characters"
        )
        .max(
            100,
            "Role name cannot exceed 100 characters"
        ),

    display_name: z
        .string()
        .trim()
        .min(
            2,
            "Display name must be at least 2 characters"
        )
        .max(
            100,
            "Display name cannot exceed 100 characters"
        ),

    description: z
        .string()
        .trim()
        .max(
            500,
            "Description cannot exceed 500 characters"
        )
        .optional()
        .or(z.literal("")),

    guard_name: z
        .string()
        .min(
            1,
            "Guard name is required"
        ),

    is_system: z.boolean(),

});

export type RoleFormData =
    z.infer<typeof roleSchema>;