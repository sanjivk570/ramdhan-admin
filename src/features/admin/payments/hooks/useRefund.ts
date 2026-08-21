import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentService } from "../services/payment.service";
import type { RefundPayload } from "../types/payment";

import { QUERY_KEYS } from "@/constants/query-keys";

interface Payload {
    orderUuid: string;
    data: RefundPayload;
}

export function useRefund() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderUuid, data }: Payload) =>
            paymentService.refund(orderUuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PAYMENTS],
            });
        },
    });
}
