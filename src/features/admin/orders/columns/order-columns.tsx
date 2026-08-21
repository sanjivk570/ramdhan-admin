import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { Order } from "../types/order";

export interface OrderColumnActions {
    onView: (order: Order) => void;
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

function orderStatusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (["completed", "delivered", "approved"].includes(value)) {
        return "success" as const;
    }
    if (["cancelled", "canceled", "refunded", "rejected", "failed"].includes(value)) {
        return "destructive" as const;
    }
    if (["pending", "processing", "shipped", "paid"].includes(value)) {
        return "default" as const;
    }
    return "secondary" as const;
}

function StatusBadge({ value }: { value: string | null | undefined }) {
    const text = value || "-";
    return (
        <Badge variant={orderStatusVariant(text)}>
            <span className="capitalize">{text}</span>
        </Badge>
    );
}

export function getOrderColumns({
    onView,
}: OrderColumnActions): ColumnDef<Order>[] {
    return [
        {
            accessorKey: "order_number",
            meta: { title: "Order Number" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Order Number" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.order_number}
                </span>
            ),
        },
        {
            accessorKey: "customer_name",
            meta: { title: "Customer" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Customer" />
            ),
            cell: ({ row }) =>
                row.original.customer_name || "-",
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
                <StatusBadge value={row.original.status} />
            ),
        },
        {
            accessorKey: "payment_status",
            meta: { title: "Payment" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Payment" />
            ),
            cell: ({ row }) => (
                <StatusBadge value={row.original.payment_status} />
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
                    {formatMoney(row.original.total, row.original.currency)}
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
            cell: ({ row }) => (
                <DataTableActions
                    onView={() => onView(row.original)}
                />
            ),
        },
    ];
}
