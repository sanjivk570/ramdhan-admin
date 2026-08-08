import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type { DashboardData } from "../types/dashboard";

export interface DashboardParams {
    days?: number;
}

export interface DashboardApiResponse {
    success: boolean;
    message: string;
    data: DashboardData;
    errors: unknown;
    meta: unknown;
}

export const dashboardService = {
    get(params?: DashboardParams) {
        return axiosClient.get<DashboardApiResponse>(
            ENDPOINTS.dashboard.index,
            {
                params,
            }
        );
    },
};