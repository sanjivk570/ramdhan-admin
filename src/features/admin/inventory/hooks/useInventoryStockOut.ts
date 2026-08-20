import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inventoryService } from "../services/inventory.service";

import type { StockOutPayload } from "../types/inventory";

import { QUERY_KEYS } from "@/constants/query-keys";

interface Variables {
  uuid: string;
  data: StockOutPayload;
}

export function useInventoryStockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, data }: Variables) =>
      inventoryService.stockOut(uuid, data),

    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVENTORY],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVENTORY, "details", variables.uuid],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVENTORY, "transactions", variables.uuid],
      });
    },
  });
}
