import { useQuery } from "@tanstack/react-query";

import { couponService } from "../services/coupon.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCoupon(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.COUPONS, uuid],
        queryFn: async () => {
            if (!uuid) {
                return undefined;
            }
            const response = await couponService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}
