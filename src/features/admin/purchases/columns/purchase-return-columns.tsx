import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import PurchaseStatusBadge from "../components/PurchaseStatusBadge";
import type { PurchaseReturn } from "../types/purchase";

export interface PurchaseReturnColumnActions {
    onPost: (purchaseReturn: PurchaseReturn) => void;
}

export function getPurchaseReturnColumns({
    onPost,
}: PurchaseReturnColumnActions): ColumnDef<PurchaseReturn>[] {
    return [
        {
            accessorKey: "return_number",
            meta: { title: "Return #" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Return #" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.return_number || "-"}
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
            accessorKey: "reason",
            meta: { title: "Reason" },
            enableSorting: false,
            enableHiding: true,
            header: "Reason",
            cell: ({ row }) => (
                <span className="block max-w-[280px] truncate">
                    {row.original.reason || "-"}
                </span>
            ),
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
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                const purchaseReturn = row.original;
                const canPost = (purchaseReturn.status || "")
                    .toLowerCase()
                    .startsWith("draft");

                return (
                    <DataTableActions
                        onActivate={
                            canPost
                                ? () => onPost(purchaseReturn)
                                : undefined
                        }
                        isActive={false}
                        onDeactivate={undefined}
                    />
                );
            },
        },
    ];
}
