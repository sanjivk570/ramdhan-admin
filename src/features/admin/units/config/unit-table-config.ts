import {
  getUnitColumns,
  type UnitColumnActions,
} from "../columns/unit-columns";

import { unitFilters } from "./filters";

import { unitExportColumns } from "./unit-export-columns";

import type { DataTableConfig, ExportColumn } from "@/components/data-table";

import type { Unit } from "../types/unit";

export function unitTableConfig(
  actions: UnitColumnActions
): DataTableConfig<Unit> {
  return {
    title: "Units",

    storageKey: "units",

    searchPlaceholder: "Search units...",

    columns: getUnitColumns(actions),

    filters: unitFilters,

    exportColumns: unitExportColumns as unknown as ExportColumn<Unit>[],
  };
}
