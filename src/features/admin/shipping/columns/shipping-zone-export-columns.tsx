import type { CsvColumn } from "@/lib/csv";

import type { ShippingZone } from "../types/shipping";

export const shippingZoneExportColumns: CsvColumn<ShippingZone>[] = [
    { key: "name", title: "Name" },
    { key: "code", title: "Code" },
    { key: "description", title: "Description" },
    { key: "sort_order", title: "Sort Order" },
    { key: "is_active", title: "Status" },
    { key: "created_at", title: "Created" },
];
