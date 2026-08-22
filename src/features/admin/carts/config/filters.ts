import type {
    DataTableFilter,
} from "@/components/data-table";

export const cartFilters: DataTableFilter[] = [
    {
        key: "customer_id",
        label: "Customer ID",
        type: "text",
    },
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
    {
        key: "coupon_code",
        label: "Coupon Code",
        type: "text",
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
