import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { Customer } from "../types/customer";

export interface CustomerColumnActions {
    onView: (customer: Customer) => void;
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
    onActivate: (customer: Customer) => void;
    onDeactivate: (customer: Customer) => void;
}

export function getCustomerColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: CustomerColumnActions): ColumnDef<Customer>[] {
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
            accessorKey: "email",
            meta: { title: "Email" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "mobile",
            meta: { title: "Mobile" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Mobile" />
            ),
            cell: ({ row }) =>
                row.original.mobile
                    ? `${row.original.country_code ?? ""}${row.original.mobile}`
                    : "-",
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            header: "Status",
            enableSorting: true,
            enableHiding: true,
            cell: ({ row }) => (
                <StatusBadge
                    isActive={Boolean(row.original.is_active)}
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
            size: 60,
            cell: ({ row }) => {
                const customer = row.original;
                return (
                    <DataTableActions
                        onView={() => onView(customer)}
                        onEdit={() => onEdit(customer)}
                        onDelete={() => onDelete(customer)}
                        onActivate={() => onActivate(customer)}
                        onDeactivate={() => onDeactivate(customer)}
                        isActive={customer.is_active}
                    />
                );
            },
        },
    ];
}
