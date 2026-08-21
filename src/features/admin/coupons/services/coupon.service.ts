import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Coupon,
    CouponListParams,
    CreateCouponPayload,
    UpdateCouponPayload,
} from "../types/coupon";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const couponService = {
    list(params: CouponListParams) {
        return axiosClient.get<PaginatedResponse<Coupon>>(
            ENDPOINTS.coupons.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<Coupon>>(
            ENDPOINTS.coupons.details(uuid)
        );
    },

    create(payload: CreateCouponPayload) {
        return axiosClient.post(
            ENDPOINTS.coupons.create,
            payload
        );
    },

    update(uuid: string, payload: UpdateCouponPayload) {
        return axiosClient.put(
            ENDPOINTS.coupons.update(uuid),
            payload
        );
    },

    delete(uuid: string) {
        return axiosClient.delete(
            ENDPOINTS.coupons.delete(uuid)
        );
    },
};
