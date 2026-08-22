import type {
    DataTableFilter,
} from "@/components/data-table";

export const invoiceFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Paid", value: "paid" },
            { label: "Pending", value: "pending" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Void", value: "void" },
        ],
    },
    {
        key: "customer_id",
        label: "Customer ID",
        type: "text",
    },
    {
        key: "due_only",
        label: "Due Only",
        type: "select",
        options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
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
