import { useQuery } from "@tanstack/react-query";

import { inventoryService } from "../services/inventory.service";

import type { InventoryTransactionParams } from "../types/inventory";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useInventoryTransactions(
  uuid?: string,
  params: InventoryTransactionParams = {}
) {
  return useQuery({
    queryKey: [QUERY_KEYS.INVENTORY, "transactions", uuid, params],

    queryFn: async () => {
      if (!uuid) {
        throw new Error("Inventory UUID is required");
      }

      const response = await inventoryService.transactions(uuid, params);

      return response.data;
    },

    enabled: Boolean(uuid),

    placeholderData: (previousData) => previousData,

    staleTime: 30 * 1000,

    refetchOnWindowFocus: false,
  });
}
