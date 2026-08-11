// import { useQuery } from "@tanstack/react-query";
// import { QUERY_KEYS } from "@/constants/query-keys";
// import { productService } from "../services/product.service";

// export function useProduct(uuid?: string) {
//     return useQuery({
//         queryKey: [QUERY_KEYS.PRODUCTS, "details", uuid],
//         queryFn: async () => {
//             if (!uuid) throw new Error("Product UUID is required");
//             const response = await productService.details(uuid);
//             return response.data.data;
//         },
//         enabled: Boolean(uuid),
//     });
// }

import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useProduct(uuid?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, "details", uuid],

    queryFn: async () => {
      if (!uuid) {
        throw new Error("Product UUID is required");
      }

      const response = await productService.details(uuid);

      return response.data.data;
    },

    enabled: Boolean(uuid),

    refetchOnWindowFocus: false,
  });
}

