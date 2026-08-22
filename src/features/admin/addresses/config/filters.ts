import type { DataTableFilter } from "@/components/data-table";

export const addressFilters: DataTableFilter[] = [
    { key: "first_name", label: "First Name", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" },
    { key: "city", label: "City", type: "text" },
    { key: "state", label: "State", type: "text" },
    {
        key: "type",
        label: "Type",
        type: "select",
        options: [
            { label: "Shipping", value: "shipping" },
            { label: "Billing", value: "billing" },
        ],
    },
];
