import type {
    DataTableFilter,
} from "@/components/data-table";

export const categoryFilters: DataTableFilter[] = [

    {
        key: "name",
        label: "Name",
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

    {
        key: "parent_name",
        label: "Parent Category",
        type: "text",
    },

];