import { useQuery } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";
import type { CartListParams } from "../types/cart";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCarts(params: CartListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.CARTS, params],
        queryFn: async () => {
            const response = await cartService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
