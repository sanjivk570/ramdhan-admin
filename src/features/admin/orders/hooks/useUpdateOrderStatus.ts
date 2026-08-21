import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adminOrderService } from "../services/order.service";
import type { UpdateOrderStatusPayload } from "../types/order";

import { QUERY_KEYS } from "@/constants/query-keys";

interface Payload {
    uuid: string;
    data: UpdateOrderStatusPayload;
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: Payload) =>
            adminOrderService.updateStatus(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ORDERS],
            });
        },
    });
}
