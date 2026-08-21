import { useQuery } from "@tanstack/react-query";

import { returnService } from "../services/return.service";
import type { ReturnListParams } from "../types/return";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useReturns(params: ReturnListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.RETURNS, params],
        queryFn: async () => {
            const response = await returnService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
