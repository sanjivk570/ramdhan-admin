import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Address,
    AddressListParams,
    CreateAddressPayload,
} from "../types/address";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const addressService = {
    list(params: AddressListParams) {
        return axiosClient.get<PaginatedResponse<Address>>(
            ENDPOINTS.addresses.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Address>>(
            ENDPOINTS.addresses.details(uuid)
        );
    },

    create(payload: CreateAddressPayload) {
        return axiosClient.post(
            ENDPOINTS.addresses.create,
            payload
        );
    },

    update(uuid: string, data: Partial<CreateAddressPayload>) {
        return axiosClient.put(
            ENDPOINTS.addresses.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.addresses.delete(uuid)
        );
    },

    setDefault(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.addresses.setDefault(uuid)
        );
    },
};