import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { Shipment } from "../types/shipment";

export interface ShipmentColumnActions {
    onShip: (shipment: Shipment) => void;
}

function statusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (value === "shipped") return "success" as const;
    if (value === "cancelled") return "destructive" as const;
    return "secondary" as const;
}

export function getShipmentColumns({
    onShip,
}: ShipmentColumnActions): ColumnDef<Shipment>[] {
    return [
        {
            accessorKey: "tracking_number",
            meta: { title: "Tracking Number" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Tracking Number" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.tracking_number || "-"}
                </span>
            ),
        },
        {
            accessorKey: "order_number",
            meta: { title: "Order" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Order" />
            ),
            cell: ({ row }) => row.original.order_number || "-",
        },
        {
            accessorKey: "carrier",
            meta: { title: "Carrier" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Carrier" />
            ),
            cell: ({ row }) => row.original.carrier || "-",
        },
        {
            accessorKey: "service",
            meta: { title: "Service" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Service" />
            ),
            cell: ({ row }) => row.original.service || "-",
        },
        {
            accessorKey: "status",
            meta: { title: "Status" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Status" />
            ),
            cell: ({ row }) => (
                <Badge variant={statusVariant(row.original.status)}>
                    <span className="capitalize">{row.original.status}</span>
                </Badge>
            ),
        },
        {
            accessorKey: "shipped_at",
            meta: { title: "Shipped At" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Shipped At" />
            ),
            cell: ({ row }) =>
                row.original.shipped_at
                    ? formatDateTime(row.original.shipped_at)
                    : "-",
        },
        {
            accessorKey: "created_at",
            meta: { title: "Created" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Created" />
            ),
            cell: ({ row }) => formatDateTime(row.original.created_at),
        },
        {
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                const shipment = row.original;
                const isShipped =
                    (shipment.status || "").toLowerCase() === "shipped";
                return (
                    <DataTableActions
                        onActivate={
                            isShipped ? undefined : () => onShip(shipment)
                        }
                        isActive={!isShipped}
                        // onShip is exposed as "Activate" label above
                        onDeactivate={undefined}
                    />
                );
            },
        },
    ];
}
