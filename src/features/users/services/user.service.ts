import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { User, UserListParams, CreateUserPayload, UpdateUserPayload, } from "../types/user";
import type { PaginatedResponse } from "@/types/api";

export const userService = {
    list(params: UserListParams) {
        return axiosClient.get<PaginatedResponse<User>>(
            ENDPOINTS.users.list,
            {
                params,
            }
        );
    },

    details(uuid: string) {
        return axiosClient.get(
            ENDPOINTS.users.details(uuid)
        );
    },

    create(data: unknown) {
        return axiosClient.post(
            ENDPOINTS.users.create,
            data
        );
    },

    update(uuid: string, data: unknown) {
        return axiosClient.put(
            ENDPOINTS.users.update(uuid),
            data
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.users.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.restore(uuid)
        );
    },

    activate(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.activate(uuid)
        );
    },

    deactivate(uuid: string) {
        return axiosClient.patch(
            ENDPOINTS.users.deactivate(uuid)
        );
    },
};