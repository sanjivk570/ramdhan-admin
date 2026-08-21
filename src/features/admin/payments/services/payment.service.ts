import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    PaymentTransaction,
    PaymentListParams,
    RefundPayload,
} from "../types/payment";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const paymentService = {
    list(params: PaymentListParams) {
        return axiosClient.get<PaginatedResponse<PaymentTransaction>>(
            ENDPOINTS.payments.transactions,
            { params }
        );
    },

    refund(orderUuid: string, payload: RefundPayload) {
        return axiosClient.post<ApiResponse<unknown>>(
            ENDPOINTS.payments.refund(orderUuid),
            payload
        );
    },
};
