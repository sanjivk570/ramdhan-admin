import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { shippingService } from "../services/shipping.service";
import type {
    CreateZonePayload,
    CreateMethodPayload,
    CreateRatePayload,
} from "../types/shipping";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateZone() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateZonePayload) =>
            shippingService.createZone(payload),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_ZONES],
            }),
    });
}

interface UpdateZonePayload {
    uuid: string;
    data: Partial<CreateZonePayload>;
}
export function useUpdateZone() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, data }: UpdateZonePayload) =>
            shippingService.updateZone(uuid, data),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_ZONES],
            }),
    });
}

export function useDeleteZone() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) =>
            shippingService.deleteZone(uuid),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_ZONES],
            }),
    });
}

interface StatusPayload {
    uuid: string;
    status: boolean;
}
export function useZoneStatus() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, status }: StatusPayload) =>
            shippingService.zoneStatus(uuid, status),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_ZONES],
            }),
    });
}

export function useCreateMethod() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateMethodPayload) =>
            shippingService.createMethod(payload),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_METHODS],
            }),
    });
}

export function useUpdateMethod() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: { uuid: string; data: Partial<CreateMethodPayload> }) =>
            shippingService.updateMethod(uuid, data),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_METHODS],
            }),
    });
}

export function useDeleteMethod() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) =>
            shippingService.deleteMethod(uuid),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_METHODS],
            }),
    });
}

export function useMethodStatus() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ uuid, status }: StatusPayload) =>
            shippingService.methodStatus(uuid, status),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_METHODS],
            }),
    });
}

export function useCreateRate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateRatePayload) =>
            shippingService.createRate(payload),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_RATES],
            }),
    });
}

export function useUpdateRate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: { uuid: string; data: Partial<CreateRatePayload> }) =>
            shippingService.updateRate(uuid, data),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_RATES],
            }),
    });
}

export function useDeleteRate() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) =>
            shippingService.deleteRate(uuid),
        onSuccess: () =>
            qc.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPPING_RATES],
            }),
    });
}