import { useMutation, useQueryClient } from "@tanstack/react-query";

import { couponService } from "../services/coupon.service";
import type {
    CreateCouponPayload,
    UpdateCouponPayload,
} from "../types/coupon";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCouponPayload) =>
            couponService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.COUPONS],
            });
        },
    });
}

export function useUpdateCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            uuid,
            data,
        }: {
            uuid: string;
            data: UpdateCouponPayload;
        }) => couponService.update(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.COUPONS],
            });
        },
    });
}

export function useDeleteCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (uuid: string) => couponService.delete(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.COUPONS],
            });
        },
    });
}
