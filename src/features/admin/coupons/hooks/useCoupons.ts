import { useQuery } from "@tanstack/react-query";

import { couponService } from "../services/coupon.service";
import type { CouponListParams } from "../types/coupon";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCoupons(params: CouponListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.COUPONS, params],
        queryFn: async () => {
            const response = await couponService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
