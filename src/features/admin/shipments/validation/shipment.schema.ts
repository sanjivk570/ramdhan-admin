import { z } from "zod";

export const shipmentSchema = z.object({
    order_uuid: z.string().min(1, "Order is required"),
    carrier: z
        .string()
        .trim()
        .min(1, "Carrier is required")
        .max(100),
    service: z.string().trim().max(100).optional().or(z.literal("")),
    tracking_number: z.string().trim().max(100).optional().or(z.literal("")),
    tracking_url: z
        .string()
        .trim()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
});

export type ShipmentFormData = z.infer<typeof shipmentSchema>;
