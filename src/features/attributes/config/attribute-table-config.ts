import type { DataTableConfig, ExportColumn } from "@/components/data-table";
import type { Attribute } from "../types/attribute";
import {
  getAttributeColumns,
  type AttributeColumnActions,
} from "../columns/attribute-columns";
import { attributeFilters } from "./filters";
import { attributeExportColumns } from "./attribute-export-columns";
export function attributeTableConfig(
  a: AttributeColumnActions
): DataTableConfig<Attribute> {
  return {
    title: "Attributes",
    storageKey: "attributes",
    searchPlaceholder: "Search attributes...",
    columns: getAttributeColumns(a),
    filters: attributeFilters,
    exportColumns:
      attributeExportColumns as unknown as ExportColumn<Attribute>[],
  };
}
