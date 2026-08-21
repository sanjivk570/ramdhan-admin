import { z } from "zod";

export const couponSchema = z.object({
    code: z
        .string()
        .trim()
        .min(2, "Code must be at least 2 characters")
        .max(50, "Code cannot exceed 50 characters"),
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(120, "Name cannot exceed 120 characters"),
    discount_type: z.enum(["percentage", "fixed"]),
    discount_value: z.coerce
        .number()
        .positive("Discount value must be greater than zero"),
    maximum_discount: z.coerce
        .number()
        .nonnegative()
        .optional()
        .or(z.literal("")),
    minimum_order_amount: z.coerce
        .number()
        .nonnegative(),
    usage_limit: z.coerce
        .number()
        .int()
        .nonnegative()
        .optional()
        .or(z.literal("")),
    per_customer_limit: z.coerce
        .number()
        .int()
        .nonnegative(),
    starts_at: z.string().optional().or(z.literal("")),
    ends_at: z.string().optional().or(z.literal("")),
    is_active: z.boolean(),
});

export type CouponFormData = z.infer<typeof couponSchema>;
