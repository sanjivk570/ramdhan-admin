import { z } from "zod";

export const userSchema = z.object({
    first_name: z.string().min(2),
    last_name: z.string().optional(),
    email: z.email(),
    mobile: z.string().optional(),
    role: z.string(),
});

export type UserFormData = z.infer<typeof userSchema>;