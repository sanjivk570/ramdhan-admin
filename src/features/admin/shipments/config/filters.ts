import type {
    DataTableFilter,
} from "@/components/data-table";

export const shipmentFilters: DataTableFilter[] = [
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Pending", value: "pending" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
        ],
    },
    {
        key: "carrier",
        label: "Carrier",
        type: "text",
    },
    {
        key: "order_id",
        label: "Order ID",
        type: "text",
    },
    {
        key: "customer_id",
        label: "Customer ID",
        type: "text",
    },
    {
        key: "shipped_from",
        label: "Shipped From",
        type: "date",
    },
    {
        key: "shipped_to",
        label: "Shipped To",
        type: "date",
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
