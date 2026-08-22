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
            { label: "Converted", value: "converted" },
            { label: "Merged", value: "merged" },
            // { label: "Abandoned", value: "abandoned" },
        ],
    },
];
