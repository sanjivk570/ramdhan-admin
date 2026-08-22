import type { DataTableFilter } from "@/components/data-table";

export const shippingZoneFilters: DataTableFilter[] = [
    { key: "name", label: "Name", type: "text" },
    { key: "code", label: "Code", type: "text" },
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
