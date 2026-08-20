import { z } from "zod";

const money = (label: string) =>
    z.coerce.number().min(0, `${label} cannot be negative`);

export const productSchema = z.object({
    name: z.string().trim().min(2).max(255),
    slug: z.string().trim().min(2).max(255).regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers and hyphens only"
    ),
    sku: z.string().trim().min(1).max(100),
    description: z.string().optional().or(z.literal("")),
    short_description: z.string().max(500).optional().or(z.literal("")),
    unit_id: z.coerce.number().positive().optional(),
    tax_class_id: z.coerce.number().positive().optional(),
    price: money("Price"),
    compare_price: money("Compare price").optional(),
    cost_price: money("Cost price").optional(),
    stock_quantity: z.coerce.number().int().min(0),
    low_stock_threshold: z.coerce.number().int().min(0),
    is_active: z.boolean(),
    is_featured: z.boolean(),
    sort_order: z.coerce.number().int().min(0),
    categories: z.array(z.string()).min(1, "Select at least one category"),
});

export type ProductFormData = z.infer<typeof productSchema>;
