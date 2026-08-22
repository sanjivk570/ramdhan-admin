import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    ShippingZone,
    ShippingMethod,
    ShippingRate,
    ListParams,
    CreateZonePayload,
    CreateMethodPayload,
    CreateRatePayload,
} from "../types/shipping";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const shippingService = {
    // Zones
    zones(params: ListParams) {
        return axiosClient.get<PaginatedResponse<ShippingZone>>(
            ENDPOINTS.shippingZones.list,
            { params }
        );
    },

    zoneDetails(uuid: string) {
        return axiosClient.get<ApiResponse<ShippingZone>>(
            ENDPOINTS.shippingZones.details(uuid)
        );
    },

    createZone(payload: CreateZonePayload) {
        return axiosClient.post(
            ENDPOINTS.shippingZones.create,
            payload
        );
    },

    updateZone(uuid: string, data: Partial<CreateZonePayload>) {
        return axiosClient.put(
            ENDPOINTS.shippingZones.update(uuid),
            data
        );
    },

    deleteZone(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.shippingZones.delete(uuid)
        );
    },

    zoneStatus(uuid: string, status: boolean) {
        return axiosClient.patch(
            ENDPOINTS.shippingZones.status(uuid),
            { status }
        );
    },

    // Methods
    methods(params: ListParams) {
        return axiosClient.get<PaginatedResponse<ShippingMethod>>(
            ENDPOINTS.shippingMethods.list,
            { params }
        );
    },

    createMethod(payload: CreateMethodPayload) {
        return axiosClient.post(
            ENDPOINTS.shippingMethods.create,
            payload
        );
    },

    updateMethod(uuid: string, data: Partial<CreateMethodPayload>) {
        return axiosClient.put(
            ENDPOINTS.shippingMethods.update(uuid),
            data
        );
    },

    deleteMethod(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.shippingMethods.delete(uuid)
        );
    },

    methodStatus(uuid: string, status: boolean) {
        return axiosClient.patch(
            ENDPOINTS.shippingMethods.status(uuid),
            { status }
        );
    },

    // Rates
    rates(params: ListParams) {
        return axiosClient.get<PaginatedResponse<ShippingRate>>(
            ENDPOINTS.shippingRates.list,
            { params }
        );
    },

    createRate(payload: CreateRatePayload) {
        return axiosClient.post(
            ENDPOINTS.shippingRates.create,
            payload
        );
    },

    updateRate(uuid: string, data: Partial<CreateRatePayload>) {
        return axiosClient.put(
            ENDPOINTS.shippingRates.update(uuid),
            data
        );
    },

    deleteRate(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.shippingRates.delete(uuid)
        );
    },
};