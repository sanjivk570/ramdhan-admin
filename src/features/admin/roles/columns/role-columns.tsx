import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Role } from "../types/role";
import { SortableHeader, DataTableActions } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";


export interface RoleColumnActions {
    onView: (role: Role) => void;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
}

export function getRoleColumns({onView, onEdit, onDelete }: RoleColumnActions): ColumnDef<Role>[] { return [
// export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: "id",
        meta: {
            title: "ID",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="ID"
            />
        )
    },
    {
        accessorKey: "name",
        meta: {
            title: "Name",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Name"
            />
        ),

    },
    {
        accessorKey: "guard_name",
        meta: {
            title: "Guard Name",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Guard Name"
            />
        ),
    },
    {
        accessorKey: "display_name",
        meta: {
            title: "Display Name",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Display Name"
            />
        ),
    },
    {
        accessorKey: "description",
        meta: {
            title: "Description",
        },
        enableSorting: true,
        enableHiding: true,
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="Description"
            />
        ),
    },
    {
        accessorKey: "is_system",
        meta: {
            title: "System",
        },
        header: "System",
        enableSorting: true,
        enableHiding: true,
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.is_system
                        ? "success" : "destructive"
                }
            >
                {row.original.is_system
                    ? "Yes"
                    : "No"}
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
    //     size: 120,
    //     cell: ({ row }) => (
    //         <button
    //             className="rounded border px-2 py-1 text-sm"
    //             onClick={() => console.log(row.original)}
    //         >
    //             View
    //         </button>
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
                const role = row.original; 
                return ( 
                    <DataTableActions 
                        onView={() => onView(role) } 
                        onEdit={() => onEdit(role) } 
                        onDelete={() => onDelete(role) }
                        /> 
                ); 
            }, 
    },

]
}