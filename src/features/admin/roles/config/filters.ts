import type {
    DataTableFilter,
} from "@/components/data-table";

export const roleFilters: DataTableFilter[] = [
    {
        key: "id",
        label: "ID",
        type: "text",
    },
    {
        key: "name",
        label: "Name",
        type: "text",
    },
    {
        key: "guard_name",
        label: "Guard Name",
        type: "text",
    },
    {
        key: "display_name",
        label: "Display Name",
        type: "text",
    },
    {
        key: "description",
        label: "description",
        type: "text",
    },
    // {
    //     key: "status",
    //     label: "Status",
    //     type: "select",
    //     options: [
    //         {
    //             label: "Active",
    //             value: "1",
    //         },
    //         {
    //             label: "Inactive",
    //             value: "0",
    //         },
    //     ],
    // },
];