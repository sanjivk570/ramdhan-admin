import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getInvoiceColumns,
    type InvoiceColumnActions,
} from "../columns/invoice-columns";
import { invoiceFilters } from "./filters";
import { invoiceExportColumns } from "./invoice-export-columns";
import type { Invoice } from "../types/invoice";

export function invoiceTableConfig(
    actions: InvoiceColumnActions
): DataTableConfig<Invoice> {
    return {
        title: "Invoices",
        storageKey: "invoices",
        searchPlaceholder: "Search invoices by number or order...",
        columns: getInvoiceColumns(actions),
        filters: invoiceFilters,
        exportColumns:
            invoiceExportColumns as unknown as ExportColumn<Invoice>[],
    };
}
