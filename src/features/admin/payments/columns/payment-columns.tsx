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
            accessorKey: "provider",
            meta: { title: "Provider" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Provider" />
            ),
            cell: ({ row }) => (
                <span className="capitalize">
                    {row.original.provider || "-"}
                </span>
            ),
        },
        {
            accessorKey: "transaction_type",
            meta: { title: "Type" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Type" />
            ),
            cell: ({ row }) => (
                <Badge
                    variant={
                        row.original.transaction_type === "refund"
                            ? "destructive"
                            : "secondary"
                    }
                >
                    <span className="capitalize">
                        {row.original.transaction_type || "payment"}
                    </span>
                </Badge>
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
            cell: ({ row }) => {
                const value = (row.original.status || "").toLowerCase();
                const variant =
                    value === "success" || value === "paid"
                        ? ("success" as const)
                        : value === "failed" ||
                            value === "refunded"
                          ? ("destructive" as const)
                          : ("secondary" as const);
                return (
                    <Badge variant={variant}>
                        <span className="capitalize">
                            {row.original.status || "-"}
                        </span>
                    </Badge>
                );
            },
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
                const status = (payment.status || "").toLowerCase();
                const canRefund =
                    status === "success" || status === "paid";
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
