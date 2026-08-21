import { useQuery } from "@tanstack/react-query";

import { shipmentService } from "../services/shipment.service";
import type { ShipmentListParams } from "../types/shipment";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useShipments(params: ShipmentListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.SHIPMENTS, params],
        queryFn: async () => {
            const response = await shipmentService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
