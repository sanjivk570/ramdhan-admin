import { useQuery } from "@tanstack/react-query";

import { inventoryService } from "../services/inventory.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useInventory(uuid?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.INVENTORY, "details", uuid],

    queryFn: async () => {
      if (!uuid) {
        throw new Error("Inventory UUID is required");
      }

      const response = await inventoryService.details(uuid);

      return response.data.data;
    },

    enabled: Boolean(uuid),
  });
}
