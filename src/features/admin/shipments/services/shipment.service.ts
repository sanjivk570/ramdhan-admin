import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Shipment,
    ShipmentListParams,
    CreateShipmentPayload,
} from "../types/shipment";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const shipmentService = {
    list(params: ShipmentListParams) {
        return axiosClient.get<PaginatedResponse<Shipment>>(
            ENDPOINTS.shipments.list,
            { params }
        );
    },

    create(payload: CreateShipmentPayload) {
        return axiosClient.post<ApiResponse<Shipment>>(
            ENDPOINTS.shipments.create,
            payload
        );
    },

    ship(uuid: string) {
        return axiosClient.patch<ApiResponse<Shipment>>(
            ENDPOINTS.shipments.ship(uuid)
        );
    },

    update(uuid: string, payload: Partial<CreateShipmentPayload>) {
        return axiosClient.put<ApiResponse<Shipment>>(
            ENDPOINTS.shipments.update(uuid),
            payload
        );
    },
};
