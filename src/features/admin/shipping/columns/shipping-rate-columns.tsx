import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { ShippingRate } from "../types/shipping";

export interface ShippingRateColumnActions {
    onEdit: (rate: ShippingRate) => void;
    onDelete: (rate: ShippingRate) => void;
}

export function getShippingRateColumns({
    onEdit,
    onDelete,
}: ShippingRateColumnActions): ColumnDef<ShippingRate>[] {
    return [
        {
            accessorKey: "name",
            meta: { title: "Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Name" />
            ),
            cell: ({ row }) => row.original.name || "-",
        },
        {
            accessorKey: "zone",
            meta: { title: "Zone" },
            enableHiding: true,
            header: "Zone",
            cell: ({ row }) =>
                row.original.zone?.name ||
                `#${row.original.shipping_zone_id}`,
        },
        {
            accessorKey: "method",
            meta: { title: "Method" },
            enableHiding: true,
            header: "Method",
            cell: ({ row }) =>
                row.original.method?.name ||
                `#${row.original.shipping_method_id}`,
        },
        {
            accessorKey: "base_rate",
            meta: { title: "Base Rate" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Base Rate" />
            ),
            cell: ({ row }) =>
                row.original.base_rate
                    ? `₹${Number(row.original.base_rate).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "per_kg_rate",
            meta: { title: "Per Kg Rate" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Per Kg Rate" />
            ),
            cell: ({ row }) =>
                row.original.per_kg_rate
                    ? `₹${Number(row.original.per_kg_rate).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "min_order_amount",
            meta: { title: "Min Order" },
            enableHiding: true,
            header: "Min Order",
            cell: ({ row }) =>
                row.original.min_order_amount
                    ? `₹${Number(row.original.min_order_amount).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "max_order_amount",
            meta: { title: "Max Order" },
            enableHiding: true,
            header: "Max Order",
            cell: ({ row }) =>
                row.original.max_order_amount
                    ? `₹${Number(row.original.max_order_amount).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "free_shipping_threshold",
            meta: { title: "Free Threshold" },
            enableHiding: true,
            header: "Free Threshold",
            cell: ({ row }) =>
                row.original.free_shipping_threshold
                    ? `₹${Number(row.original.free_shipping_threshold).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            header: "Status",
            enableSorting: true,
            enableHiding: true,
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
            size: 80,
            cell: ({ row }) => {
                const rate = row.original;
                return (
                    <DataTableActions
                        onEdit={() => onEdit(rate)}
                        onDelete={() => onDelete(rate)}
                        isActive={rate.is_active}
                    />
                );
            },
        },
    ];
}
