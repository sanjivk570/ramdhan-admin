import type { DataTableFilter } from "@/components/data-table";

export const shippingRateFilters: DataTableFilter[] = [
    { key: "name", label: "Name", type: "text" },
    { key: "shipping_zone_id", label: "Zone ID", type: "text" },
    { key: "shipping_method_id", label: "Method ID", type: "text" },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "1" },
            { label: "Inactive", value: "0" },
        ],
    },
];
