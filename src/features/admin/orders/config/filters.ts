import type {
    DataTableFilter,
} from "@/components/data-table";

export const orderFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Refunded", value: "refunded" },
        ],
    },
    {
        key: "payment_status",
        label: "Payment",
        type: "select",
        options: [
            { label: "Unpaid", value: "unpaid" },
            { label: "Paid", value: "paid" },
            { label: "Failed", value: "failed" },
            { label: "Refunded", value: "refunded" },
        ],
    },
    {
        key: "fulfillment_status",
        label: "Fulfillment",
        type: "select",
        options: [
            { label: "Unfulfilled", value: "unfulfilled" },
            { label: "Shipped", value: "shipped" },
            { label: "Fulfilled", value: "fulfilled" },
        ],
    },
];
