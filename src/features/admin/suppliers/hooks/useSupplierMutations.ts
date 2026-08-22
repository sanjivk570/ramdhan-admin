import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { supplierService } from "../services/supplier.service";
import type { CreateSupplierPayload } from "../types/supplier";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateSupplier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSupplierPayload) =>
            supplierService.create(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SUPPLIERS],
            }),
    });
}

interface UpdatePayload {
    uuid: string;
    data: Partial<CreateSupplierPayload>;
}

export function useUpdateSupplier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: UpdatePayload) =>
            supplierService.update(uuid, data),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SUPPLIERS],
            }),
    });
}

export function useDeleteSupplier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            supplierService.delete(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SUPPLIERS],
            }),
    });
}

export function useRestoreSupplier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            supplierService.restore(uuid),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SUPPLIERS],
            }),
    });
}

interface StatusPayload {
    uuid: string;
    status: boolean;
}

export function useUpdateSupplierStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, status }: StatusPayload) =>
            supplierService.updateStatus(uuid, status),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SUPPLIERS],
            }),
    });
}