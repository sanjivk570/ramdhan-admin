import type { ColumnDef } from "@tanstack/react-table";

import {
    DataTableActions,
    SortableHeader,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { TaxClass } from "../types/tax-class";
import StatusBadge from "@/components/common/StatusBadge";

export interface TaxClassColumnActions {
    onView: (taxClass: TaxClass) => void;
    onEdit: (taxClass: TaxClass) => void;
    onDelete: (taxClass: TaxClass) => void;
    onActivate: (taxClass: TaxClass) => void;
    onDeactivate: (taxClass: TaxClass) => void;
}

export function getTaxClassColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: TaxClassColumnActions): ColumnDef<TaxClass>[] {
    return [
        {
            accessorKey: "name",
            meta: { title: "Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "code",
            meta: { title: "Code" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Code" />
            ),
            cell: ({ row }) => (
                <span className="font-mono text-sm">
                    {row.original.code}
                </span>
            ),
        },
        {
            accessorKey: "description",
            meta: { title: "Description" },
            enableSorting: false,
            enableHiding: true,
            header: "Description",
            cell: ({ row }) => (
                <span className="block max-w-[320px] truncate">
                    {row.original.description || "-"}
                </span>
            ),
        },
        {
            accessorKey: "sort_order",
            meta: { title: "Order" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Order" />
            ),
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            enableSorting: true,
            enableHiding: true,
            header: "Status",
            cell: ({ row }) => (
                <StatusBadge isActive={Boolean(row.original.is_active)} />
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
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <DataTableActions
                        onView={() => onView(item)}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item)}
                        onActivate={() => onActivate(item)}
                        onDeactivate={() => onDeactivate(item)}
                        isActive={item.is_active}
                    />
                );
            },
        },
    ];
}
