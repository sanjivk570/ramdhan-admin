import { z } from "zod";

export const roleSchema = z.object({
    name: z.string().min(2),
    quard_name: z.string().optional(),
    display_name: z.email(),
});

export type RoleFormData = z.infer<typeof roleSchema>;