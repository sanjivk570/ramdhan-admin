import type { DataTableFilter } from "@/components/data-table";

export const supplierFilters: DataTableFilter[] = [
    {
        key: "company_name",
        label: "Company Name",
        type: "text",
    },
    {
        key: "contact_person",
        label: "Contact Person",
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
        key: "gstin",
        label: "GSTIN",
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