import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";
import type { ProductListParams } from "../types/product";

export function useProducts(params: ProductListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCTS, params],
        queryFn: async () => {
            const response = await productService.list(params);
            return response.data;
        },
        placeholderData: (previous) => previous,
        staleTime: 30_000,
        refetchOnWindowFocus: false,
    });
}
