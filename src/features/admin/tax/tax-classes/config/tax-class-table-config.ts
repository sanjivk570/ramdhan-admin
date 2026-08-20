import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";
import type { CsvColumn } from "@/lib/csv";

import {
    getTaxClassColumns,
    type TaxClassColumnActions,
} from "../columns/tax-class-columns";

import type { TaxClass } from "../types/tax-class";

import { taxClassFilters } from "./filters";

const taxClassExportColumns: CsvColumn<TaxClass>[] = [
    { key: "name", title: "Name" },
    { key: "code", title: "Code" },
    { key: "description", title: "Description" },
    { key: "is_active", title: "Status" },
    { key: "sort_order", title: "Sort Order" },
];

export function taxClassTableConfig(
    actions: TaxClassColumnActions
): DataTableConfig<TaxClass> {
    return {
        title: "Tax Classes",
        storageKey: "tax-classes",
        searchPlaceholder: "Search tax classes...",
        columns: getTaxClassColumns(actions),
        filters: taxClassFilters,
        exportColumns:
            taxClassExportColumns as unknown as ExportColumn<TaxClass>[],
    };
}
