import type {
    DataTableFilter,
} from "@/components/data-table";

export const paymentFilters: DataTableFilter[] = [
    {
        key: "payment_status",
        label: "Status",
        type: "select",
        options: [
            { label: "Paid", value: "paid" },
            { label: "Pending", value: "pending" },
            { label: "Failed", value: "failed" },
            { label: "Refunded", value: "refunded" },
            { label: "Cancelled", value: "cancelled" },
        ],
    },
    {
        key: "payment_method",
        label: "Method",
        type: "select",
        options: [
            { label: "Card", value: "card" },
            { label: "Bank Transfer", value: "bank_transfer" },
            { label: "Cash on Delivery", value: "cash_on_delivery" },
            { label: "Wallet", value: "wallet" },
        ],
    },
];
