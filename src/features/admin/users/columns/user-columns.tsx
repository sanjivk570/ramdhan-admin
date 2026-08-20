import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { User } from "../types/user";
import { SortableHeader, DataTableActions } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";

export interface UserColumnActions {
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onActivate: (user: User) => void;
    onDeactivate: (user: User) => void;
}


export function getUserColumns({ onView, onEdit, onDelete, onActivate, onDeactivate, }: UserColumnActions): ColumnDef<User>[] { return [
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
        )
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
            <StatusBadge isActive={Boolean(row.original.is_active)} />
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
        size: 60, 
        cell: ({ row }) => 
            { 
                const user = row.original; 
                return ( 
                    <DataTableActions 
                        onView={() => onView(user) } 
                        onEdit={() => onEdit(user) } 
                        onDelete={() => onDelete(user) } 
                        onActivate={() => onActivate(user) } 
                        onDeactivate={() => onDeactivate(user) } 
                        isActive={ user.is_active }
                     /> 
                ); 
            }, 
    },

]
}