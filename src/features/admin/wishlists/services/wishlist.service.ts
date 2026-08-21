import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Wishlist,
    WishlistListParams,
} from "../types/wishlist";
import type {
    PaginatedResponse,
} from "@/types/api";

export const wishlistService = {
    list(params: WishlistListParams) {
        return axiosClient.get<PaginatedResponse<Wishlist>>(
            ENDPOINTS.wishlists.list,
            { params }
        );
    },
};
