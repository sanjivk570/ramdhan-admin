import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getReturnColumns,
    type ReturnColumnActions,
} from "../columns/return-columns";
import { returnFilters } from "./filters";
import { returnExportColumns } from "./return-export-columns";
import type { ReturnRequest } from "../types/return";

export function returnTableConfig(
    actions: ReturnColumnActions
): DataTableConfig<ReturnRequest> {
    return {
        title: "Returns",
        storageKey: "returns",
        searchPlaceholder: "Search returns by order or customer...",
        columns: getReturnColumns(actions),
        filters: returnFilters,
        exportColumns:
            returnExportColumns as unknown as ExportColumn<ReturnRequest>[],
    };
}
