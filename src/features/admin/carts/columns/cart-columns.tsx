import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import type { Cart } from "../types/cart";

export interface CartColumnActions {
    onView: (cart: Cart) => void;
}

export function getCartColumns({
    onView,
}: CartColumnActions): ColumnDef<Cart>[] {
    return [
        {
            accessorKey: "uuid",
            meta: { title: "Cart" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Cart" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.uuid || "-"}
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
                <span className="capitalize">{row.original.status}</span>
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
