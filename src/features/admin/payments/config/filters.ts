import type {
    DataTableFilter,
} from "@/components/data-table";

export const paymentFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Success", value: "success" },
            { label: "Pending", value: "pending" },
            { label: "Failed", value: "failed" },
            { label: "Refunded", value: "refunded" },
        ],
    },
    {
        key: "provider",
        label: "Provider",
        type: "select",
        options: [
            { label: "Razorpay", value: "razorpay" },
            { label: "Stripe", value: "stripe" },
            { label: "COD", value: "cod" },
            { label: "Bank Transfer", value: "bank_transfer" },
            { label: "Wallet", value: "wallet" },
        ],
    },
    {
        key: "transaction_type",
        label: "Type",
        type: "select",
        options: [
            { label: "Payment", value: "payment" },
            { label: "Refund", value: "refund" },
        ],
    },
    {
        key: "order_id",
        label: "Order ID",
        type: "text",
    },
    {
        key: "min_amount",
        label: "Min Amount",
        type: "text",
    },
    {
        key: "max_amount",
        label: "Max Amount",
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
