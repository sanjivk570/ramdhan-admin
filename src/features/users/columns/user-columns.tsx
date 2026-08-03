// import type { ColumnDef } from "@tanstack/react-table";

// export interface UserRow {
//     uuid: string;
//     first_name: string;
//     email: string;
// }

// export const columns: ColumnDef<UserRow>[] = [
//     {
//         accessorKey: "first_name",
//         header: "First Name",
//     },
//     {
//         accessorKey: "email",
//         header: "Email",
//     },

// ];

// import type { ColumnDef } from "@tanstack/react-table";

// import type { User } from "../types/user";

// export const columns: ColumnDef<User>[] = [

//     {
//         accessorKey: "first_name",

//         header: "First Name",
//     },

//     {
//         accessorKey: "email",

//         header: "Email",
//     },

//     {
//         accessorKey: "mobile",

//         header: "Mobile",
//     },

//     {
//         accessorKey: "is_active",

//         header: "Status",

//         cell: ({ row }) => {

//             return row.original.is_active
//                 ? "Active"
//                 : "Inactive";

//         },
//     },

// ];


import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import type { User } from "../types/user";

import { SortableHeader } from "@/components/data-table";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "first_name",
        meta: {

            title: "First Name",

        },
        header: ({ column }) => (
            <SortableHeader
                column={column}
                title="First Name"
            />
        ),

    },
    {
        accessorKey: "email",
        meta: {
            title: "Email",
        },
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