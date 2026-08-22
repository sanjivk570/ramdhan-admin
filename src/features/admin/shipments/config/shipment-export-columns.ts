import type { CsvColumn } from "@/lib/csv";

import type { Shipment } from "../types/shipment";

export const shipmentExportColumns: CsvColumn<Shipment>[] = [
    {
        key: "tracking_number",
        title: "Tracking Number",
    },
    {
        key: "order_number",
        title: "Order",
    },
    {
        key: "carrier",
        title: "Carrier",
    },
    {
        key: "service",
        title: "Service",
    },
    {
        key: "status",
        title: "Status",
    },
    {
        key: "shipped_at",
        title: "Shipped At",
    },
    {
        key: "created_at",
        title: "Created",
    },
];
