import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Customer,
    CustomerListParams,
    CreateCustomerPayload,
} from "../types/customer";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const customerService = {
    list(params: CustomerListParams) {
        return axiosClient.get<PaginatedResponse<Customer>>(
            ENDPOINTS.customers.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Customer>>(
            ENDPOINTS.customers.details(uuid)
        );
    },

    create(payload: CreateCustomerPayload) {
        return axiosClient.post(
            ENDPOINTS.customers.create,
            payload
        );
    },

    update(uuid: string, data: Partial<CreateCustomerPayload>) {
        return axiosClient.put(
            ENDPOINTS.customers.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(ENDPOINTS.customers.delete(uuid));
    },

    restore(uuid: string) {
        return axiosClient.patch(ENDPOINTS.customers.restore(uuid));
    },

    updateStatus(uuid: string, status: boolean) {
        return axiosClient.patch(ENDPOINTS.customers.status(uuid), {
            status,
        });
    },
};
