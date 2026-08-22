import { useQuery } from "@tanstack/react-query";

import { customerService } from "../services/customer.service";
import type { CustomerListParams } from "../types/customer";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCustomers(params: CustomerListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.CUSTOMERS, params],
        queryFn: async () => {
            const response =
                await customerService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useCustomer(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.CUSTOMERS, uuid],
        queryFn: async () => {
            if (!uuid) return undefined;
            const response =
                await customerService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}
