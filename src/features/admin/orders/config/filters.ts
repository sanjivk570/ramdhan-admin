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
            { label: "Confirmed", value: "confirmed" },
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
    {
        key: "customer_id",
        label: "Customer ID",
        type: "text",
    },
    {
        key: "payment_method",
        label: "Payment Method",
        type: "select",
        options: [
            { label: "COD", value: "cod" },
            { label: "Card", value: "card" },
            { label: "Razorpay", value: "razorpay" },
            { label: "Bank Transfer", value: "bank_transfer" },
            { label: "Wallet", value: "wallet" },
        ],
    },
    {
        key: "min_total",
        label: "Min Total",
        type: "text",
    },
    {
        key: "max_total",
        label: "Max Total",
        type: "text",
    },
    {
        key: "from_date",
        label: "From Date",
        type: "date",
    },
    {
        key: "to_date",
        label: "To Date",
        type: "date",
    },
];
