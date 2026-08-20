import type { DataTableConfig } from "@/components/data-table";

import type { InventoryStock } from "../types/inventory";

import {
  getInventoryColumns,
  type InventoryColumnActions,
} from "../columns/inventory-columns";

import { inventoryFilters } from "./filters";

export function inventoryTableConfig(
  actions: InventoryColumnActions
): DataTableConfig<InventoryStock> {
  return {
    title: "Inventory",

    storageKey: "inventory",

    searchPlaceholder: "Search inventory...",

    columns: getInventoryColumns(actions),

    filters: inventoryFilters,
  };
}
