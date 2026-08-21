import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { Coupon } from "../types/coupon";
import StatusBadge from "@/components/common/StatusBadge";

export interface CouponColumnActions {
    onEdit: (coupon: Coupon) => void;
    onDelete: (coupon: Coupon) => void;
}

export function getCouponColumns({
    onEdit,
    onDelete,
}: CouponColumnActions): ColumnDef<Coupon>[] {
    return [
        {
            accessorKey: "code",
            meta: { title: "Code" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Code" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm font-medium">
                    {row.original.code}
                </span>
            ),
        },
        {
            accessorKey: "name",
            meta: { title: "Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Name" />
            ),
        },
        {
            id: "discount",
            meta: { title: "Discount" },
            enableSorting: false,
            enableHiding: true,
            header: "Discount",
            cell: ({ row }) => {
                const coupon = row.original;
                const value =
                    coupon.discount_type === "percentage"
                        ? `${Number(coupon.discount_value).toFixed(0)}%`
                        : `₹${Number(coupon.discount_value).toFixed(2)}`;
                return (
                    <span className="font-medium">{value}</span>
                );
            },
        },
        {
            accessorKey: "minimum_order_amount",
            meta: { title: "Min Order" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Min Order" />
            ),
            cell: ({ row }) =>
                `₹${Number(row.original.minimum_order_amount).toFixed(2)}`,
        },
        {
            id: "usage",
            meta: { title: "Usage" },
            enableSorting: false,
            enableHiding: true,
            header: "Usage",
            cell: ({ row }) => {
                const coupon = row.original;
                const used = coupon.used_count ?? 0;
                const limit = coupon.usage_limit;
                return (
                    <span className="text-sm">
                        {used}
                        {limit ? ` / ${limit}` : ""}
                    </span>
                );
            },
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            enableSorting: true,
            enableHiding: true,
            header: "Status",
            cell: ({ row }) => (
                <StatusBadge isActive={Boolean(row.original.is_active)} />
            ),
        },
        {
            accessorKey: "created_at",
            meta: { title: "Created" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Created" />
            ),
            cell: ({ row }) =>
                formatDateTime(row.original.created_at),
        },
        {
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => (
                <DataTableActions
                    onEdit={() => onEdit(row.original)}
                    onDelete={() => onDelete(row.original)}
                />
            ),
        },
    ];
}
