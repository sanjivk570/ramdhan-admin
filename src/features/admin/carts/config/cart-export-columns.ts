import type { CsvColumn } from "@/lib/csv";

import type { Cart } from "../types/cart";

export const cartExportColumns: CsvColumn<Cart>[] = [
    {
        key: "id",
        title: "ID",
    },
    {
        key: "customer",
        title: "Customer",
        value: (row) => row.customer?.name ?? "",
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
        key: "discount_amount",
        title: "Discount",
    },
    {
        key: "tax_amount",
        title: "Tax",
    },
    {
        key: "shipping_amount",
        title: "Shipping",
    },
    {
        key: "grand_total",
        title: "Grand Total",
    },
    {
        key: "created_at",
        title: "Created",
    },
];
