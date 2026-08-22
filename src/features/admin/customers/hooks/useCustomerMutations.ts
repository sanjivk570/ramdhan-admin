import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { customerService } from "../services/customer.service";
import type { CreateCustomerPayload } from "../types/customer";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateCustomerPayload) =>
            customerService.create(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CUSTOMERS],
            }),
    });
}

interface UpdatePayload {
    uuid: string;
    data: Partial<CreateCustomerPayload>;
}

export function useUpdateCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: UpdatePayload) =>
            customerService.update(uuid, data),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CUSTOMERS],
            }),
    });
}

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            customerService.delete(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CUSTOMERS],
            }),
    });
}

export function useRestoreCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            customerService.restore(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CUSTOMERS],
            }),
    });
}

interface StatusPayload {
    uuid: string;
    status: boolean;
}

export function useUpdateCustomerStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, status }: StatusPayload) =>
            customerService.updateStatus(uuid, status),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CUSTOMERS],
            }),
    });
}
