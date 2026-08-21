import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import type { Invoice } from "../types/invoice";

export interface InvoiceColumnActions {
    onView: (invoice: Invoice) => void;
}

function statusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (value === "paid") return "success" as const;
    if (value === "cancelled" || value === "void") return "destructive" as const;
    return "secondary" as const;
}

export function getInvoiceColumns({
    onView,
}: InvoiceColumnActions): ColumnDef<Invoice>[] {
    return [
        {
            accessorKey: "invoice_number",
            meta: { title: "Invoice" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Invoice #"
                />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.invoice_number || "-"}
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
            accessorKey: "customer_name",
            meta: { title: "Customer" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Customer" />
            ),
            cell: ({ row }) => row.original.customer_name || "-",
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
            accessorKey: "total",
            meta: { title: "Total" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Total" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.total)}
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
            cell: ({ row }) => formatDateTime(row.original.created_at),
        },
                {
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => (
                <DataTableActions onView={() => onView(row.original)} />
            ),
        },
    ];
}
