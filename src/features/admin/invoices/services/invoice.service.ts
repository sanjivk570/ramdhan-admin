import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Invoice,
    InvoiceListParams,
    GenerateInvoicePayload,
} from "../types/invoice";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const invoiceService = {
    list(params: InvoiceListParams) {
        return axiosClient.get<PaginatedResponse<Invoice>>(
            ENDPOINTS.invoices.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Invoice>>(
            ENDPOINTS.invoices.details(uuid)
        );
    },

    generate(payload: GenerateInvoicePayload) {
        return axiosClient.post<ApiResponse<Invoice>>(
            ENDPOINTS.invoices.generate(payload.order_uuid),
            payload
        );
    },
};
