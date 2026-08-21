import { useQuery } from "@tanstack/react-query";

import { adminOrderService } from "../services/order.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useOrder(uuid: string | undefined) {
    return useQuery({
        queryKey: [
            QUERY_KEYS.ORDERS,
            uuid,
        ],
        queryFn: async () => {
            if (!uuid) {
                return undefined;
            }
            const response =
                await adminOrderService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}
