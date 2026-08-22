import type { CsvColumn } from "@/lib/csv";

import type { ShippingRate } from "../types/shipping";

export const shippingRateExportColumns: CsvColumn<ShippingRate>[] = [
    { key: "name", title: "Name" },
    { key: "shipping_zone_id", title: "Zone ID" },
    { key: "shipping_method_id", title: "Method ID" },
    { key: "base_rate", title: "Base Rate" },
    { key: "per_kg_rate", title: "Per Kg Rate" },
    { key: "min_order_amount", title: "Min Order" },
    { key: "max_order_amount", title: "Max Order" },
    { key: "free_shipping_threshold", title: "Free Threshold" },
    { key: "is_active", title: "Status" },
    { key: "created_at", title: "Created" },
];
