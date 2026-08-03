import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import type { User } from "../types/user";

import { SortableHeader } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "first_name",
        meta: {
            title: "First Name",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="First Name"
            />
        ),

    },
    {
        accessorKey: "last_name",
        meta: {
            title: "Last Name",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Last Name"
            />
        ),

    },
    {
        accessorKey: "email",
        meta: {
            title: "Email",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Email"
            />
        ),
    },
    {
        accessorKey: "mobile",
        meta: {
            title: "Mobile",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Mobile"
            />
        ),
    },
    {
        accessorKey: "is_active",
        meta: {
            title: "Status",
        },
        header: "Status",
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.is_active
                        ? "default"
                        : "secondary"
                }
            >
                {row.original.is_active
                    ? "Active"
                    : "Inactive"}
            </Badge>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Created"
            />
        ),
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) =>
            formatDateTime(
                row.original.created_at
            ),
    },

    {
        id: "actions",
        header: "Actions",
        meta: {
            title: "Actions",
        },
        enableSorting: false,
        enableHiding: false,
        size: 120,
        cell: ({ row }) => (
            <button
                className="rounded border px-2 py-1 text-sm"
                onClick={() => console.log(row.original)}
            >
                View
            </button>
        ),
    }

];