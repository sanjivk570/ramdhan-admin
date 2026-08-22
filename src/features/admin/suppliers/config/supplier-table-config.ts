import type {
    DataTableConfig,
    DataTableFilter,
    ExportColumn,
} from "@/components/data-table";

import {
    getSupplierColumns,
    type SupplierColumnActions,
} from "../columns/supplier-columns";
import { supplierExportColumns } from "../columns/supplier-export-columns";
import type { Supplier } from "../types/supplier";
import { supplierFilters } from "./filters";

export function supplierTableConfig(
    actions: SupplierColumnActions
): DataTableConfig<Supplier> {
    return {
        title: "Suppliers",
        storageKey: "suppliers",
        searchPlaceholder: "Search suppliers by company name...",
        columns: getSupplierColumns(actions),
        filters: supplierFilters,
        exportColumns:
            supplierExportColumns as unknown as ExportColumn<Supplier>[],
    };
}