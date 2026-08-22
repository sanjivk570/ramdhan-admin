import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getCouponColumns,
    type CouponColumnActions,
} from "../columns/coupon-columns";
import { couponFilters } from "./filters";
import { couponExportColumns } from "./coupon-export-columns";
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
        exportColumns:
            couponExportColumns as unknown as ExportColumn<Coupon>[],
    };
}
