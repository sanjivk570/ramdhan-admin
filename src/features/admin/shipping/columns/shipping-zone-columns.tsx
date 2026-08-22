import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { ShippingZone } from "../types/shipping";

export interface ShippingZoneColumnActions {
    onView: (zone: ShippingZone) => void;
    onEdit: (zone: ShippingZone) => void;
    onDelete: (zone: ShippingZone) => void;
    onActivate: (zone: ShippingZone) => void;
    onDeactivate: (zone: ShippingZone) => void;
}

export function getShippingZoneColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: ShippingZoneColumnActions): ColumnDef<ShippingZone>[] {
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
            accessorKey: "description",
            meta: { title: "Description" },
            enableHiding: true,
            header: "Description",
            cell: ({ row }) => row.original.description || "-",
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
                const zone = row.original;
                return (
                    <DataTableActions
                        onView={() => onView(zone)}
                        onEdit={() => onEdit(zone)}
                        onDelete={() => onDelete(zone)}
                        onActivate={() => onActivate(zone)}
                        onDeactivate={() => onDeactivate(zone)}
                        isActive={zone.is_active}
                    />
                );
            },
        },
    ];
}
