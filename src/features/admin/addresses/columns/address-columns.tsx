import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { Address } from "../types/address";

export interface AddressColumnActions {
    onEdit: (address: Address) => void;
    onDelete: (address: Address) => void;
    onSetDefault: (address: Address) => void;
}

export function getAddressColumns({
    onEdit,
    onDelete,
    onSetDefault,
}: AddressColumnActions): ColumnDef<Address>[] {
    return [
        {
            accessorKey: "first_name",
            meta: { title: "First Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="First Name" />
            ),
        },
        {
            accessorKey: "last_name",
            meta: { title: "Last Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Last Name" />
            ),
            cell: ({ row }) => row.original.last_name || "-",
        },
        {
            accessorKey: "address_line_1",
            meta: { title: "Address Line 1" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Address Line 1" />
            ),
            cell: ({ row }) => row.original.address_line_1 || "-",
        },
        {
            accessorKey: "city",
            meta: { title: "City" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="City" />
            ),
        },
        {
            accessorKey: "state",
            meta: { title: "State" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="State" />
            ),
        },
        {
            accessorKey: "postal_code",
            meta: { title: "Postal Code" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Postal Code" />
            ),
        },
        {
            accessorKey: "type",
            meta: { title: "Type" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Type" />
            ),
            cell: ({ row }) => (
                <span className="capitalize">
                    {row.original.type || "-"}
                </span>
            ),
        },
        {
            accessorKey: "is_default",
            meta: { title: "Default" },
            header: "Default",
            enableSorting: true,
            enableHiding: true,
            cell: ({ row }) => (
                <StatusBadge
                    isActive={Boolean(row.original.is_default)}
                />
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
            size: 80,
            cell: ({ row }) => {
                const address = row.original;
                return (
                    <DataTableActions
                        onEdit={() => onEdit(address)}
                        onDelete={() => onDelete(address)}
                        onActivate={() => onSetDefault(address)}
                        isActive={address.is_default}
                    />
                );
            },
        },
    ];
}