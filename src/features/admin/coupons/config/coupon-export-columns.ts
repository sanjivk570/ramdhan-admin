import type { CsvColumn } from "@/lib/csv";

import type { Coupon } from "../types/coupon";

export const couponExportColumns: CsvColumn<Coupon>[] = [
    {
        key: "code",
        title: "Code",
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "discount_type",
        title: "Discount Type",
    },
    {
        key: "discount_value",
        title: "Discount Value",
    },
    {
        key: "minimum_order_amount",
        title: "Min Order",
    },
    {
        key: "used_count",
        title: "Used",
    },
    {
        key: "usage_limit",
        title: "Usage Limit",
    },
    {
        key: "is_active",
        title: "Status",
    },
    {
        key: "starts_at",
        title: "Starts At",
    },
    {
        key: "ends_at",
        title: "Ends At",
    },
];
