import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Supplier,
    SupplierListParams,
    CreateSupplierPayload,
} from "../types/supplier";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const supplierService = {
    list(params: SupplierListParams) {
        return axiosClient.get<PaginatedResponse<Supplier>>(
            ENDPOINTS.suppliers.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Supplier>>(
            ENDPOINTS.suppliers.details(uuid)
        );
    },

    create(payload: CreateSupplierPayload) {
        return axiosClient.post(
            ENDPOINTS.suppliers.create,
            payload
        );
    },

    update(uuid: string, data: Partial<CreateSupplierPayload>) {
        return axiosClient.put(
            ENDPOINTS.suppliers.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.suppliers.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.suppliers.restore(uuid)
        );
    },

    updateStatus(uuid: string, status: boolean) {
        return axiosClient.patch(
            ENDPOINTS.suppliers.status(uuid),
            { status }
        );
    },
};