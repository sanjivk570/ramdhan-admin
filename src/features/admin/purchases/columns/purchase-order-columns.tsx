import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import PurchaseStatusBadge from "../components/PurchaseStatusBadge";
import type { PurchaseOrder } from "../types/purchase";

export interface PurchaseOrderColumnActions {
    onSubmit: (order: PurchaseOrder) => void;
    onApprove: (order: PurchaseOrder) => void;
    onCancel: (order: PurchaseOrder) => void;
}

export function getPurchaseOrderColumns({
    onSubmit,
    onApprove,
    onCancel,
}: PurchaseOrderColumnActions): ColumnDef<PurchaseOrder>[] {
    return [
        {
            accessorKey: "po_number",
            meta: { title: "PO Number" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="PO Number" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.po_number || "-"}
                </span>
            ),
        },
        {
            accessorKey: "supplier_name",
            meta: { title: "Supplier" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Supplier" />
            ),
            cell: ({ row }) => row.original.supplier_name || "-",
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
                <PurchaseStatusBadge value={row.original.status} />
            ),
        },
        {
            accessorKey: "grand_total",
            meta: { title: "Total" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Total" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(
                        row.original.grand_total,
                        row.original.currency_code
                    )}
                </span>
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
                const order = row.original;
                const status = (
                    order.status || ""
                ).toLowerCase();

                return (
                    <DataTableActions
                        onActivate={
                            status === "draft"
                                ? () => onSubmit(order)
                                : undefined
                        }
                        onEdit={
                            status === "submitted"
                                ? () => onApprove(order)
                                : undefined
                        }
                        onDelete={
                            status !== "cancelled" &&
                            status !== "approved"
                                ? () => onCancel(order)
                                : undefined
                        }
                        isActive={false}
                        isDeleted={false}
                    />
                );
            },
        },
    ];
}
