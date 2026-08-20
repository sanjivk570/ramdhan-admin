import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";
import type { CsvColumn } from "@/lib/csv";

import {
    getTaxRateColumns,
    type TaxRateColumnActions,
} from "../columns/tax-rate-columns";

import type { TaxRate } from "../types/tax-rate";

import { taxRateFilters } from "./filters";

const taxRateExportColumns: CsvColumn<TaxRate>[] = [
    { key: "name", title: "Name" },
    { key: "rate", title: "Rate" },
    { key: "country_code", title: "Country" },
    { key: "state_code", title: "State" },
    { key: "priority", title: "Priority" },
    { key: "is_active", title: "Status" },
];

export function taxRateTableConfig(
    actions: TaxRateColumnActions
): DataTableConfig<TaxRate> {
    return {
        title: "Tax Rates",
        storageKey: "tax-rates",
        searchPlaceholder: "Search tax rates...",
        columns: getTaxRateColumns(actions),
        filters: taxRateFilters,
        exportColumns:
            taxRateExportColumns as unknown as ExportColumn<TaxRate>[],
    };
}
