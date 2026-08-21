import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Cart,
    CartListParams,
} from "../types/cart";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const cartService = {
    list(params: CartListParams) {
        return axiosClient.get<PaginatedResponse<Cart>>(
            ENDPOINTS.carts.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Cart>>(
            ENDPOINTS.carts.details(uuid)
        );
    },
};
