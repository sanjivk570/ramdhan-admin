import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import PurchaseStatusBadge from "../components/PurchaseStatusBadge";
import type { GoodsReceipt } from "../types/purchase";

export interface GoodsReceiptColumnActions {
    onPost: (receipt: GoodsReceipt) => void;
    onVoid: (receipt: GoodsReceipt) => void;
}

export function getGoodsReceiptColumns({
    onPost,
    onVoid,
}: GoodsReceiptColumnActions): ColumnDef<GoodsReceipt>[] {
    return [
        {
            accessorKey: "grn_number",
            meta: { title: "GRN" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="GRN" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.grn_number || "-"}
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
            accessorKey: "receipt_date",
            meta: { title: "Receipt Date" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Receipt Date" />
            ),
            cell: ({ row }) => row.original.receipt_date || "-",
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
                const receipt = row.original;
                const status = (
                    receipt.status || ""
                ).toLowerCase();

                return (
                    <DataTableActions
                        onActivate={
                            status === "draft"
                                ? () => onPost(receipt)
                                : undefined
                        }
                        onDelete={
                            status === "posted"
                                ? () => onVoid(receipt)
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
