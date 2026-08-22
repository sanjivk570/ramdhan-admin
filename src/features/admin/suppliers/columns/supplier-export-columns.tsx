import type { CsvColumn } from "@/lib/csv";

import type { Supplier } from "../types/supplier";

export const supplierExportColumns: CsvColumn<Supplier>[] = [
    {
        key: "company_name",
        title: "Company Name",
    },
    {
        key: "contact_person",
        title: "Contact Person",
    },
    {
        key: "email",
        title: "Email",
    },
    {
        key: "mobile",
        title: "Mobile",
    },
    {
        key: "gstin",
        title: "GSTIN",
    },
    {
        key: "credit_limit",
        title: "Credit Limit",
    },
    {
        key: "is_active",
        title: "Status",
    },
    {
        key: "created_at",
        title: "Created",
    },
];