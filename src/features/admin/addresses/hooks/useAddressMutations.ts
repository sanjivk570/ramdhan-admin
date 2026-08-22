import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { addressService } from "../services/address.service";
import type { CreateAddressPayload } from "../types/address";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateAddressPayload) =>
            addressService.create(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADDRESSES],
            }),
    });
}

interface UpdatePayload {
    uuid: string;
    data: Partial<CreateAddressPayload>;
}

export function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: UpdatePayload) =>
            addressService.update(uuid, data),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADDRESSES],
            }),
    });
}

export function useDeleteAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            addressService.delete(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADDRESSES],
            }),
    });
}

export function useSetDefaultAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            addressService.setDefault(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.ADDRESSES],
            }),
    });
}