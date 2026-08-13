import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxRateService } from "../services/tax-rate.service";
import type {
    CreateTaxRatePayload,
    UpdateTaxRatePayload,
} from "../types/tax-rate";

export function useCreateTaxRate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaxRatePayload) =>
            taxRateService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_RATES],
            });
        },
    });
}

export function useUpdateTaxRate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: {
            uuid: string;
            data: UpdateTaxRatePayload;
        }) => taxRateService.update(uuid, data),

        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_RATES],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.TAX_RATES,
                    "details",
                    variables.uuid,
                ],
            });
        },
    });
}

export function useDeleteTaxRate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            taxRateService.delete(uuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_RATES],
            });
        },
    });
}

export function useUpdateTaxRateStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            status,
        }: {
            uuid: string;
            status: boolean;
        }) => taxRateService.updateStatus(uuid, status),

        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_RATES],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.TAX_RATES,
                    "details",
                    variables.uuid,
                ],
            });
        },
    });
}

export function useRestoreTaxRate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) =>
            taxRateService.restore(uuid),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TAX_RATES],
            });
        },
    });
}
