import { z } from "zod";

export const productVariantSchema = z.object({
    name: z.string().trim().min(2).max(255),
    sku: z.string().trim().min(1).max(100),
    price: z.coerce.number().min(0),
    compare_price: z.coerce.number().min(0).optional(),
    cost_price: z.coerce.number().min(0).optional(),
    stock_quantity: z.coerce.number().int().min(0),
    low_stock_threshold: z.coerce.number().int().min(0),
    is_default: z.boolean(),
    is_active: z.boolean(),
    sort_order: z.coerce.number().int().min(0),
    attribute_values: z.array(z.string()),
});

export type ProductVariantFormData = z.infer<typeof productVariantSchema>;
