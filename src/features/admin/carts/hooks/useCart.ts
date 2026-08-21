import { useQuery } from "@tanstack/react-query";

import { cartService } from "../services/cart.service";
import type { Cart } from "../types/cart";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCart(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.CARTS, uuid],
        queryFn: async () => {
            if (!uuid) {
                return undefined;
            }
            const response = await cartService.details(uuid);
            return response.data.data as Cart;
        },
        enabled: Boolean(uuid),
    });
}
