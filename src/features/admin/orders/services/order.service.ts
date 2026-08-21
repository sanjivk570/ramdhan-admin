import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Order,
    OrderListParams,
    UpdateOrderStatusPayload,
} from "../types/order";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const adminOrderService = {
    list(params: OrderListParams) {
        return axiosClient.get<PaginatedResponse<Order>>(
            ENDPOINTS.orders.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Order>>(
            ENDPOINTS.orders.details(uuid)
        );
    },

    updateStatus(
        uuid: string,
        payload: UpdateOrderStatusPayload
    ) {
        return axiosClient.patch(
            ENDPOINTS.orders.updateStatus(uuid),
            payload
        );
    },
};
