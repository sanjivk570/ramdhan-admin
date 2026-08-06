import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { User } from "../types/user";
import { Button } from "@/components/ui/button";
import { SortableHeader, DataTableActions } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import { Link } from "react-router-dom";
import { ROUTES } from "@/app/router/route-paths";

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

    // {
    //     id: "actions",
    //     header: "Actions",
    //     meta: {
    //         title: "Actions",
    //     },
    //     enableSorting: false,
    //     enableHiding: false,
    //     size: 140,
    //     cell: ({ row }) => (
    //         <div className="flex items-center gap-2">

    //             <Button variant="outline" size="sm" >
    //                 <Link to={`${ROUTES.USERS}/${row.original.uuid}/edit`} > Edit </Link>
    //             </Button>
                
    //             <button
    //                 className="rounded border px-2 py-1 text-sm"
    //                 onClick={() => console.log(row.original)}
    //             >
    //                 View
    //             </button>
    //         </div>
    //     ),
    // }

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