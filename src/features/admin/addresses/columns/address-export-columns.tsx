import type { CsvColumn } from "@/lib/csv";

import type { Address } from "../types/address";

export const addressExportColumns: CsvColumn<Address>[] = [
    { key: "first_name", title: "First Name" },
    { key: "last_name", title: "Last Name" },
    { key: "address_line_1", title: "Address Line 1" },
    { key: "address_line_2", title: "Address Line 2" },
    { key: "city", title: "City" },
    { key: "state", title: "State" },
    { key: "postal_code", title: "Postal Code" },
    { key: "country", title: "Country" },
    { key: "type", title: "Type" },
    { key: "is_default", title: "Default" },
    { key: "created_at", title: "Created" },
];
