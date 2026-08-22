import type { CsvColumn } from "@/lib/csv";

import type { ShippingMethod } from "../types/shipping";

export const shippingMethodExportColumns: CsvColumn<ShippingMethod>[] = [
    { key: "name", title: "Name" },
    { key: "code", title: "Code" },
    { key: "tracking_url", title: "Tracking URL" },
    { key: "is_active", title: "Status" },
    { key: "created_at", title: "Created" },
];
