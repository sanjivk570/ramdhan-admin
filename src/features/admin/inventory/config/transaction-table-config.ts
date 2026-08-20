import type { DataTableConfig } from "@/components/data-table";

import type { InventoryTransaction } from "../types/inventory";

import { getTransactionColumns } from "../columns/transaction-columns";

export function transactionTableConfig(): DataTableConfig<InventoryTransaction> {
  return {
    title: "Transaction History",

    storageKey: "inventory-transactions",

    searchPlaceholder: "Search transactions...",

    columns: getTransactionColumns(),

    filters: [],
  };
}
