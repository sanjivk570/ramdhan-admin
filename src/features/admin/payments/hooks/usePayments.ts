import { useQuery } from "@tanstack/react-query";

import { paymentService } from "../services/payment.service";
import type { PaymentListParams } from "../types/payment";

import { QUERY_KEYS } from "@/constants/query-keys";

export function usePayments(params: PaymentListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.PAYMENTS, params],
        queryFn: async () => {
            const response = await paymentService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
