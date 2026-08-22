import type { CsvColumn } from "@/lib/csv";

import type { Invoice } from "../types/invoice";

export const invoiceExportColumns: CsvColumn<Invoice>[] = [
    {
        key: "invoice_number",
        title: "Invoice #",
    },
    {
        key: "order_number",
        title: "Order",
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
        title: "Created",
    },
];
