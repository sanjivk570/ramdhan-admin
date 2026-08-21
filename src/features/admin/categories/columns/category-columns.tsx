import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";

import { formatDateTime } from "@/lib/date";

import type { Category } from "../types/category";

import StatusBadge from "@/components/common/StatusBadge";


export interface CategoryColumnActions {
    onView: (category: Category) => void;

    onEdit: (category: Category) => void;

    onDelete: (category: Category) => void;

    onActivate: (category: Category) => void;

    onDeactivate: (category: Category) => void;
}

export function getCategoryColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: CategoryColumnActions): ColumnDef<Category>[] {
    return [
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
            accessorKey: "slug",

            meta: {
                title: "Slug",
            },

            enableSorting: true,

            enableHiding: true,

            header: ({ column }) => (
                <SortableHeader
                    column={column}
                    title="Slug"
                />
            ),
        },

        {
            id: "parent",

            meta: {
                title: "Parent",
            },

            enableSorting: false,

            enableHiding: true,

            header: "Parent",

            cell: ({ row }) => (
                <span className="text-sm">
                    {row.original.parent?.name ??
                        "Root Category"}
                </span>
            ),
        },

        {
            accessorKey: "sort_order",

            meta: {
                title: "Sort Order",
            },

            enableSorting: true,

            enableHiding: true,

            header: ({ column }) => (
                <SortableHeader
                    column={column}
                    title="Sort Order"
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

            meta: {
                title: "Created",
            },

            enableSorting: true,

            enableHiding: true,

            header: ({ column }) => (
                <SortableHeader
                    column={column}
                    title="Created"
                />
            ),

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

            cell: ({ row }) => {
                const category =
                    row.original;

                return (
                    <DataTableActions
                        onView={() =>
                            onView(category)
                        }

                        onEdit={() =>
                            onEdit(category)
                        }

                        onDelete={() =>
                            onDelete(category)
                        }

                        onActivate={() =>
                            onActivate(category)
                        }

                        onDeactivate={() =>
                            onDeactivate(category)
                        }

                        isActive={
                            category.is_active
                        }
                    />
                );
            },
        },
    ];
}