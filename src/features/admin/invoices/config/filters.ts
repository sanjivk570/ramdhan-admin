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
];
