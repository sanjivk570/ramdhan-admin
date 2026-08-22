import type {
    DataTableFilter,
} from "@/components/data-table";

export const returnFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
        ],
    },
    {
        key: "refund_status",
        label: "Refund Status",
        type: "select",
        options: [
            { label: "Pending", value: "pending" },
            { label: "Processing", value: "processing" },
            { label: "Refunded", value: "refunded" },
            { label: "Failed", value: "failed" },
        ],
    },
    {
        key: "customer_id",
        label: "Customer ID",
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
