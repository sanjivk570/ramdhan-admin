import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableActions, SortableHeader } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import type { Attribute } from "../types/attribute";
import StatusBadge from "@/components/common/StatusBadge";

export interface AttributeColumnActions {
  onView: (x: Attribute) => void;
  onEdit: (x: Attribute) => void;
  onDelete: (x: Attribute) => void;
  onActivate: (x: Attribute) => void;
  onDeactivate: (x: Attribute) => void;
}
export function getAttributeColumns(
  a: AttributeColumnActions
): ColumnDef<Attribute>[] {
  return [
    {
      accessorKey: "name",
      meta: { title: "Name" },
      enableSorting: true,
      enableHiding: true,
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
    },
    {
      accessorKey: "slug",
      meta: { title: "Slug" },
      enableSorting: true,
      enableHiding: true,
      header: ({ column }) => <SortableHeader column={column} title="Slug" />,
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.slug}</span>
      ),
    },
    {
      accessorKey: "type",
      meta: { title: "Type" },
      enableSorting: true,
      enableHiding: true,
      header: ({ column }) => <SortableHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.type}
        </Badge>
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
      accessorKey: "sort_order",
      meta: { title: "Sort Order" },
      enableSorting: true,
      enableHiding: true,
      header: ({ column }) => (
        <SortableHeader column={column} title="Sort Order" />
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
        <DataTableActions
          onView={() => a.onView(row.original)}
          onEdit={() => a.onEdit(row.original)}
          onDelete={() => a.onDelete(row.original)}
          onActivate={() => a.onActivate(row.original)}
          onDeactivate={() => a.onDeactivate(row.original)}
          isActive={row.original.is_active}
        />
      ),
    },
  ];
}
