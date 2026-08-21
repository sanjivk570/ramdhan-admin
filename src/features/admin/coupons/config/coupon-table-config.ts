import type {
    DataTableConfig,
} from "@/components/data-table";

import {
    getCouponColumns,
    type CouponColumnActions,
} from "../columns/coupon-columns";
import { couponFilters } from "./filters";
import type { Coupon } from "../types/coupon";

export function couponTableConfig(
    actions: CouponColumnActions
): DataTableConfig<Coupon> {
    return {
        title: "Coupons",
        storageKey: "coupons",
        searchPlaceholder: "Search coupons by code or name...",
        columns: getCouponColumns(actions),
        filters: couponFilters,
    };
}
