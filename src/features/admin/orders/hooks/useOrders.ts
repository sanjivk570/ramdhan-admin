import { useQuery } from "@tanstack/react-query";

import { adminOrderService } from "../services/order.service";
import type { OrderListParams } from "../types/order";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useOrders(params: OrderListParams) {
    return useQuery({
        queryKey: [
            QUERY_KEYS.ORDERS,
            params,
        ],
        queryFn: async () => {
            const response =
                await adminOrderService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
