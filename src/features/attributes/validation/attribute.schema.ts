import { z } from "zod";
export const attributeSchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.string().min(1),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean(),
});
export const attributeValueSchema = z.object({
  value: z.string().trim().min(1).max(150),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  display_value: z.string().trim().max(150).optional().or(z.literal("")),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean(),
});
export type AttributeFormData = z.infer<typeof attributeSchema>;
export type AttributeValueFormData = z.infer<typeof attributeValueSchema>;
