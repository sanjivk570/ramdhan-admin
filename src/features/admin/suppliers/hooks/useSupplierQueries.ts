import { useQuery } from "@tanstack/react-query";

import { supplierService } from "../services/supplier.service";
import type { SupplierListParams } from "../types/supplier";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useSuppliers(params: SupplierListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.SUPPLIERS, params],
        queryFn: async () => {
            const response =
                await supplierService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useSupplier(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.SUPPLIERS, uuid],
        queryFn: async () => {
            if (!uuid) return undefined;
            const response =
                await supplierService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}