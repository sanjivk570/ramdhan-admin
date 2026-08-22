import type { CsvColumn } from "@/lib/csv";

import type { ReturnRequest } from "../types/return";

export const returnExportColumns: CsvColumn<ReturnRequest>[] = [
    {
        key: "return_number",
        title: "Return Number",
    },
    {
        key: "order_number",
        title: "Order",
    },
    {
        key: "customer_name",
        title: "Customer",
    },
    {
        key: "status",
        title: "Status",
    },
    {
        key: "refund_amount",
        title: "Refund",
    },
    {
        key: "created_at",
        title: "Date",
    },
];
