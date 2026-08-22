import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import PurchaseStatusBadge from "../components/PurchaseStatusBadge";
import type { PurchaseInvoice } from "../types/purchase";

export interface PurchaseInvoiceColumnActions {
    onPost: (invoice: PurchaseInvoice) => void;
}

export function getPurchaseInvoiceColumns({
    onPost,
}: PurchaseInvoiceColumnActions): ColumnDef<PurchaseInvoice>[] {
    return [
        {
            accessorKey: "supplier_invoice_number",
            meta: { title: "Invoice #" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Invoice #" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.supplier_invoice_number || "-"}
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
            accessorKey: "due_date",
            meta: { title: "Due Date" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Due Date" />
            ),
            cell: ({ row }) => row.original.due_date || "-",
        },
        {
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                const invoice = row.original;
                const canPost = (invoice.status || "")
                    .toLowerCase()
                    .startsWith("draft");

                return (
                    <DataTableActions
                        onActivate={
                            canPost
                                ? () => onPost(invoice)
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
