import type {
    DataTableFilter,
} from "@/components/data-table";

export const userFilters: DataTableFilter[] = [
    {
        key: "first_name",
        label: "First Name",
        type: "text",
    },
    {
        key: "email",
        label: "Email",
        type: "text",
    },
    {
        key: "mobile",
        label: "Mobile",
        type: "text",
    },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            {
                label: "Active",
                value: "1",
            },
            {
                label: "Inactive",
                value: "0",
            },
        ],
    },
];