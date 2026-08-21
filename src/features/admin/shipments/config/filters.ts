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
        key: "tracking_number",
        label: "Tracking Number",
        type: "text",
    },
];
