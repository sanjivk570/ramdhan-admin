import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type { Permission } from "../types/permission";

export const permissionService = {

    list() {
        return axiosClient.get<{
            success: boolean;
            message: string;
            data: Permission[];
            errors: null;
            meta: unknown;
        }>(
            ENDPOINTS.permissions.list
        );
    },

};