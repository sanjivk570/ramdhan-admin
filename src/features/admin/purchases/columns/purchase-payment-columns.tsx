import type { ColumnDef } from "@tanstack/react-table";

import { SortableHeader } from "@/components/data-table";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import type { PurchasePayment } from "../types/purchase";

export function getPurchasePaymentColumns(): ColumnDef<PurchasePayment>[] {
    return [
        {
            accessorKey: "reference_number",
            meta: { title: "Reference" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Reference" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.reference_number || "-"}
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
            accessorKey: "amount",
            meta: { title: "Amount" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(
                        row.original.amount,
                        row.original.currency_code
                    )}
                </span>
            ),
        },
        {
            accessorKey: "payment_method",
            meta: { title: "Method" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Method" />
            ),
            cell: ({ row }) => (
                <span className="capitalize">
                    {(row.original.payment_method || "-").replace(
                        /_/g,
                        " "
                    )}
                </span>
            ),
        },
        {
            accessorKey: "payment_date",
            meta: { title: "Date" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Date" />
            ),
            cell: ({ row }) => row.original.payment_date || "-",
        },
    ];
}
