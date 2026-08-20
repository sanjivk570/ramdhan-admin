import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxClassService } from "../services/tax-class.service";
import type {
    CreateTaxClassPayload,
    UpdateTaxClassPayload,
} from "../types/tax-class";

export function useCreateTaxClass() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaxClassPayload) =>
            taxClassService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_CLASSES],
            });
        },
    });
}

export function useUpdateTaxClass() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: {
            uuid: string;
            data: UpdateTaxClassPayload;
        }) => taxClassService.update(uuid, data),

        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_CLASSES],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.TAX_CLASSES,
                    "details",
                    variables.uuid,
                ],
            });
        },
    });
}

export function useDeleteTaxClass() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            taxClassService.delete(uuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_CLASSES],
            });
        },
    });
}

export function useUpdateTaxClassStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            status,
        }: {
            uuid: string;
            status: boolean;
        }) => taxClassService.updateStatus(uuid, status),

        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_CLASSES],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.TAX_CLASSES,
                    "details",
                    variables.uuid,
                ],
            });
        },
    });
}

export function useRestoreTaxClass() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            taxClassService.restore(uuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_CLASSES],
            });
        },
    });
}
