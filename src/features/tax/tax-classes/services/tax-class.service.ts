import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

import type {
    TaxClass,
    TaxClassListParams,
    CreateTaxClassPayload,
    UpdateTaxClassPayload,
} from "../types/tax-class";

export const taxClassService = {
    list(params: TaxClassListParams) {
        return axiosClient.get<PaginatedResponse<TaxClass>>(
            ENDPOINTS.taxClasses.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<TaxClass>>(
            ENDPOINTS.taxClasses.details(uuid)
        );
    },

    create(data: CreateTaxClassPayload) {
        return axiosClient.post<ApiResponse<TaxClass>>(
            ENDPOINTS.taxClasses.create,
            data
        );
    },

    update(uuid: string, data: UpdateTaxClassPayload) {
        return axiosClient.put<ApiResponse<TaxClass>>(
            ENDPOINTS.taxClasses.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.taxClasses.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.post<ApiResponse<TaxClass>>(
            ENDPOINTS.taxClasses.restore(uuid)
        );
    },

    updateStatus(uuid: string, status: boolean) {
        return axiosClient.patch<ApiResponse<TaxClass>>(
            ENDPOINTS.taxClasses.status(uuid),
            { status }
        );
    },
};
