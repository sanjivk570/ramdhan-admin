import { useMutation, useQueryClient } from "@tanstack/react-query";

import { shipmentService } from "../services/shipment.service";
import type { CreateShipmentPayload } from "../types/shipment";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateShipment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateShipmentPayload) =>
            shipmentService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPMENTS],
            });
        },
    });
}

export function useShipShipment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) => shipmentService.ship(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.SHIPMENTS],
            });
        },
    });
}
