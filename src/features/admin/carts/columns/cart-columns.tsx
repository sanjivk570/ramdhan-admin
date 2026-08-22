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
            accessorKey: "id",
            meta: { title: "ID" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="ID" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.id || "-"}
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
            
            cell: ({ row })  => row.original.customer?.name || "-",
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
            accessorKey: "discount_amount",
            meta: { title: "discount_amount" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="discount_amount" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.discount_amount)}
                </span>
            ),
        },
        {
            accessorKey: "tax_amount",
            meta: { title: "tax_amount" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="tax_amount" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.tax_amount)}
                </span>
            ),
        },
        {
            accessorKey: "shipping_amount",
            meta: { title: "shipping_amount" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="shipping_amount" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.shipping_amount)}
                </span>
            ),
        },
        {
            accessorKey: "subtotal",
            meta: { title: "Subtotal" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Subtotal" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.subtotal)}
                </span>
            ),
        },
        {
            accessorKey: "grand_total",
            meta: { title: "grand_total" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="grand_total" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {formatMoney(row.original.grand_total)}
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
