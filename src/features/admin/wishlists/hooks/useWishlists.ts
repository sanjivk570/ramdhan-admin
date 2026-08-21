import { useQuery } from "@tanstack/react-query";

import { wishlistService } from "../services/wishlist.service";
import type { WishlistListParams } from "../types/wishlist";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useWishlists(params: WishlistListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.WISHLISTS, params],
        queryFn: async () => {
            const response = await wishlistService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
