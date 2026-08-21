import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import type { PaymentTransaction } from "../types/payment";

export interface PaymentColumnActions {
    onRefund: (payment: PaymentTransaction) => void;
}

function statusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (value === "paid" || value === "completed") return "success" as const;
    if (value === "failed" || value === "cancelled" || value === "refunded")
        return "destructive" as const;
    return "secondary" as const;
}

export function getPaymentColumns({
    onRefund,
}: PaymentColumnActions): ColumnDef<PaymentTransaction>[] {
    return [
        {
            accessorKey: "transaction_id",
            meta: { title: "Transaction" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Transaction" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.transaction_id || "-"}
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
            accessorKey: "amount",
            meta: { title: "Amount" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.amount)}
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
            cell: ({ row }) => row.original.payment_method || "-",
        },
        {
            accessorKey: "payment_status",
            meta: { title: "Status" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Status" />
            ),
            cell: ({ row }) => (
                <Badge variant={statusVariant(row.original.payment_status)}>
                    <span className="capitalize">
                        {row.original.payment_status}
                    </span>
                </Badge>
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
            cell: ({ row }) => {
                const payment = row.original;
                const canRefund = payment.payment_status === "paid";
                return (
                    <DataTableActions
                        onActivate={
                            canRefund ? () => onRefund(payment) : undefined
                        }
                        isActive={!canRefund}
                        onDeactivate={undefined}
                    />
                );
            },
        },
    ];
}
