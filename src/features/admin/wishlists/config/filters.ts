import type {
    DataTableFilter,
} from "@/components/data-table";

export const wishlistFilters: DataTableFilter[] = [
    {
        key: "customer_id",
        label: "Customer ID",
        type: "text",
    },
    {
        key: "product_id",
        label: "Product ID",
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
