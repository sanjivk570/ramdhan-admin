import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Role, RoleListParams, CreateRolePayload, UpdateRolePayload } from "../types/./role.ts";
import type { PaginatedResponse } from "@/types/api";

export const roleService = {
    list(params: RoleListParams) {
        return axiosClient.get<PaginatedResponse<Role>>(
            ENDPOINTS.roles.list,
            {
                params,
            }
        );
    },

    details(id: number) {
        return axiosClient.get(
            ENDPOINTS.roles.details(id)
        );
    },

    create(data: CreateRolePayload) {
        return axiosClient.post(
            ENDPOINTS.roles.create,
            data
        );
    },

    update(
        id: number,
        data: UpdateRolePayload
    ) {

        return axiosClient.put(
            ENDPOINTS.roles.update(id),
            data
        );

    },

    delete(id: number) {

        return axiosClient.delete(
            ENDPOINTS.roles.delete(id)
        );

    },

    permissions(id: number) {

        return axiosClient.get<string[]>(
            ENDPOINTS.roles.permissions(id)
        );

    },

    updatePermissions(
        id: number,
        permissions: string[]
    ) {

        return axiosClient.put(
            ENDPOINTS.roles.permissions(id),
            {
                permissions,
            }
        );

    },

};