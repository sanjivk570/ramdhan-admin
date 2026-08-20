import { useQuery } from "@tanstack/react-query";

import { inventoryService } from "../services/inventory.service";

import type { InventoryListParams } from "../types/inventory";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useInventoryList(params: InventoryListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.INVENTORY, "list", params],

    queryFn: async () => {
      const response = await inventoryService.list(params);

      return response.data;
    },

    placeholderData: (previousData) => previousData,

    staleTime: 30 * 1000,

    refetchOnWindowFocus: false,
  });
}
