import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getPaymentColumns,
    type PaymentColumnActions,
} from "../columns/payment-columns";
import { paymentFilters } from "./filters";
import { paymentExportColumns } from "./payment-export-columns";
import type { PaymentTransaction } from "../types/payment";

export function paymentTableConfig(
    actions: PaymentColumnActions
): DataTableConfig<PaymentTransaction> {
    return {
        title: "Payments",
        storageKey: "payments",
        searchPlaceholder: "Search payments by transaction or order...",
        columns: getPaymentColumns(actions),
        filters: paymentFilters,
        exportColumns:
            paymentExportColumns as unknown as ExportColumn<PaymentTransaction>[],
    };
}
