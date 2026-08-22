import type { CsvColumn } from "@/lib/csv";

import type { PaymentTransaction } from "../types/payment";

export const paymentExportColumns: CsvColumn<PaymentTransaction>[] = [
    {
        key: "transaction_id",
        title: "Transaction",
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
        key: "amount",
        title: "Amount",
    },
    {
        key: "provider",
        title: "Provider",
    },
    {
        key: "transaction_type",
        title: "Type",
    },
    {
        key: "status",
        title: "Status",
    },
    {
        key: "created_at",
        title: "Date",
    },
];
