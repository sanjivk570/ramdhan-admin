import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

export interface MasterDataParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

export const catalogService = {
    units(params: MasterDataParams = {}) {
        return axiosClient.get(ENDPOINTS.units.list, {
            params,
        });
    },

    taxClasses(params: MasterDataParams = {}) {
        return axiosClient.get(ENDPOINTS.taxClasses.list, {
            params,
        });
    },
};
