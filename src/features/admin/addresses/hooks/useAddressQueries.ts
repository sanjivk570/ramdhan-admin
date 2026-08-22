import { useQuery } from "@tanstack/react-query";

import { addressService } from "../services/address.service";
import type { AddressListParams } from "../types/address";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useAddresses(params: AddressListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.ADDRESSES, params],
        queryFn: async () => {
            const response =
                await addressService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useAddress(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.ADDRESSES, uuid],
        queryFn: async () => {
            if (!uuid) return undefined;
            const response =
                await addressService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}