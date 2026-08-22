import { useQuery } from "@tanstack/react-query";

import { shippingService } from "../services/shipping.service";
import type { ListParams } from "../types/shipping";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useShippingZones(params: ListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.SHIPPING_ZONES, params],
        queryFn: async () => {
            const response =
                await shippingService.zones(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useShippingMethods(params: ListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.SHIPPING_METHODS, params],
        queryFn: async () => {
            const response =
                await shippingService.methods(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useShippingRates(params: ListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.SHIPPING_RATES, params],
        queryFn: async () => {
            const response =
                await shippingService.rates(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}