import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../services/dashboard.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDashboard(days: number = 7) {
    return useQuery({
        queryKey: [
            QUERY_KEYS.DASHBOARD,
            days,
        ],

        queryFn: async () => {
            const response =
                await dashboardService.get({
                    days,
                });

            return response.data;
        },

        placeholderData: (previousData) =>
            previousData,

        staleTime: 30 * 1000,
    });
}