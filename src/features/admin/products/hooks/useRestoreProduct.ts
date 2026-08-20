import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productService } from "../services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useRestoreProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => productService.restore(uuid),

    onSuccess: (_response, uuid) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCTS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCTS, "details", uuid],
      });
    },
  });
}
