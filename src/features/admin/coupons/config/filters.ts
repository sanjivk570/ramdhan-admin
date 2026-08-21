import type {
    DataTableFilter,
} from "@/components/data-table";

export const couponFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "1" },
            { label: "Inactive", value: "0" },
        ],
    },
    {
        key: "discount_type",
        label: "Discount Type",
        type: "select",
        options: [
            { label: "Percentage", value: "percentage" },
            { label: "Fixed", value: "fixed" },
        ],
    },
];
