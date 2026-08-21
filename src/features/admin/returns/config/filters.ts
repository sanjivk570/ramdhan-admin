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
];
