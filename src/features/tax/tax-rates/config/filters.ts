import type { DataTableFilter } from "@/components/data-table";

export const taxRateFilters: DataTableFilter[] = [
    {
        key: "name",
        label: "Name",
        type: "text",
    },
    {
        key: "country_code",
        label: "Country",
        type: "text",
    },
    {
        key: "state_code",
        label: "State",
        type: "text",
    },
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
