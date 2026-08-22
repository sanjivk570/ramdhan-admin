import type {
    DataTableFilter,
} from "@/components/data-table";

export const couponFilters: DataTableFilter[] = [
    {
        key: "discount_type",
        label: "Discount Type",
        type: "select",
        options: [
            { label: "Percentage", value: "percentage" },
            { label: "Fixed", value: "fixed" },
        ],
    },
    {
        key: "is_active",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
        ],
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
