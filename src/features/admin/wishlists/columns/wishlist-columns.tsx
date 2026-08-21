import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { Wishlist } from "../types/wishlist";

export interface WishlistColumnActions {
    onView: (wishlist: Wishlist) => void;
}

export function getWishlistColumns({
    onView,
}: WishlistColumnActions): ColumnDef<Wishlist>[] {
    return [
        {
            accessorKey: "uuid",
            meta: { title: "Wishlist" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Wishlist" />
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
