import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { ReturnRequest } from "../types/return";

export interface ReturnColumnActions {
    onView: (item: ReturnRequest) => void;
}

export function formatMoney(
    value: number | string | null | undefined,
    currency = "INR"
): string {
    const amount = Number(value ?? 0);
    try {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
        }).format(amount);
    } catch {
        return `${currency} ${amount.toFixed(2)}`;
    }
}

function statusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (value === "approved") return "success" as const;
    if (value === "rejected") return "destructive" as const;
    return "secondary" as const;
}

export function getReturnColumns({
    onView,
}: ReturnColumnActions): ColumnDef<ReturnRequest>[] {
    return [
        {
            accessorKey: "return_number",
            meta: { title: "Return Number" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Return Number" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.return_number}
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
            accessorKey: "refund_amount",
            meta: { title: "Refund" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Refund" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.refund_amount)}
                </span>
            ),
        },
        {
            accessorKey: "created_at",
            meta: { title: "Date" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Date" />
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
