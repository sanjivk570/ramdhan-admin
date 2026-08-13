import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

import type {
    TaxRate,
    TaxRateListParams,
    CreateTaxRatePayload,
    UpdateTaxRatePayload,
} from "../types/tax-rate";

export const taxRateService = {
    list(params: TaxRateListParams) {
        return axiosClient.get<PaginatedResponse<TaxRate>>(
            ENDPOINTS.taxRates.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<TaxRate>>(
            ENDPOINTS.taxRates.details(uuid)
        );
    },

    create(data: CreateTaxRatePayload) {
        return axiosClient.post<ApiResponse<TaxRate>>(
            ENDPOINTS.taxRates.create,
            data
        );
    },

    update(uuid: string, data: UpdateTaxRatePayload) {
        return axiosClient.put<ApiResponse<TaxRate>>(
            ENDPOINTS.taxRates.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.taxRates.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.post<ApiResponse<TaxRate>>(
            ENDPOINTS.taxRates.restore(uuid)
        );
    },

    updateStatus(uuid: string, status: boolean) {
        return axiosClient.patch<ApiResponse<TaxRate>>(
            ENDPOINTS.taxRates.status(uuid),
            { status }
        );
    },
};
