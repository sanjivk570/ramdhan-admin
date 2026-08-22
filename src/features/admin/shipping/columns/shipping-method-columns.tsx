import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { ShippingMethod } from "../types/shipping";

export interface ShippingMethodColumnActions {
    onView: (method: ShippingMethod) => void;
    onEdit: (method: ShippingMethod) => void;
    onDelete: (method: ShippingMethod) => void;
    onActivate: (method: ShippingMethod) => void;
    onDeactivate: (method: ShippingMethod) => void;
}

export function getShippingMethodColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: ShippingMethodColumnActions): ColumnDef<ShippingMethod>[] {
    return [
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
            accessorKey: "code",
            meta: { title: "Code" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Code" />
            ),
            cell: ({ row }) => row.original.code || "-",
        },
        {
            accessorKey: "tracking_url",
            meta: { title: "Tracking URL" },
            enableHiding: true,
            header: "Tracking URL",
            cell: ({ row }) => row.original.tracking_url || "-",
        },
        {
            accessorKey: "sort_order",
            meta: { title: "Sort Order" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Sort Order" />
            ),
            cell: ({ row }) => row.original.sort_order ?? 0,
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
            size: 60,
            cell: ({ row }) => {
                const method = row.original;
                return (
                    <DataTableActions
                        onView={() => onView(method)}
                        onEdit={() => onEdit(method)}
                        onDelete={() => onDelete(method)}
                        onActivate={() => onActivate(method)}
                        onDeactivate={() => onDeactivate(method)}
                        isActive={method.is_active}
                    />
                );
            },
        },
    ];
}
