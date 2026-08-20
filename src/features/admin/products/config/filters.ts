import type { DataTableFilter } from "@/components/data-table";

export const productFilters: DataTableFilter[] = [
    {
        key: "category",
        label: "Category",
        type: "text",
    },
    {
        key: "is_active",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "1" },
            { label: "Inactive", value: "0" },
        ],
    },
    {
        key: "is_featured",
        label: "Featured",
        type: "select",
        options: [
            { label: "Featured", value: "1" },
            { label: "Not Featured", value: "0" },
        ],
    },
    {
        key: "min_price",
        label: "Minimum Price",
        type: "text",
    },
    {
        key: "max_price",
        label: "Maximum Price",
        type: "text",
    },
];
