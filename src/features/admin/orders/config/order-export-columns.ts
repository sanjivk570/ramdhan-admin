import type { CsvColumn } from "@/lib/csv";

import type { Order } from "../types/order";

export const orderExportColumns: CsvColumn<Order>[] = [
    {
        key: "order_number",
        title: "Order Number",
    },
    {
        key: "customer_name",
        title: "Customer",
    },
    {
        key: "status",
        title: "Status",
    },
    {
        key: "payment_status",
        title: "Payment",
    },
    {
        key: "fulfillment_status",
        title: "Fulfillment",
    },
    {
        key: "subtotal",
        title: "Subtotal",
    },
    {
        key: "discount",
        title: "Discount",
    },
    {
        key: "tax",
        title: "Tax",
    },
    {
        key: "shipping",
        title: "Shipping",
    },
    {
        key: "total",
        title: "Total",
    },
    {
        key: "created_at",
        title: "Date",
    },
];
