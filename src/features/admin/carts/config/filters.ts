import type {
    DataTableFilter,
} from "@/components/data-table";

export const cartFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "active" },
            { label: "Pending", value: "pending" },
            { label: "Ordered", value: "ordered" },
            { label: "Abandoned", value: "abandoned" },
        ],
    },
];
