import type { ColumnDef } from "@tanstack/react-table";

import type { Unit } from "../types/unit";

import { SortableHeader, DataTableActions } from "@/components/data-table";

import { formatDateTime } from "@/lib/date";

import UnitStatusBadge from "../components/UnitStatusBadge";

export interface UnitColumnActions {
  onView: (unit: Unit) => void;

  onEdit: (unit: Unit) => void;

  onDelete: (unit: Unit) => void;

  onActivate: (unit: Unit) => void;

  onDeactivate: (unit: Unit) => void;
}

export function getUnitColumns({
  onView,
  onEdit,
  onDelete,
  onActivate,
  onDeactivate,
}: UnitColumnActions): ColumnDef<Unit>[] {
  return [
    {
      accessorKey: "name",

      meta: {
        title: "Name",
      },

      enableSorting: true,

      enableHiding: true,

      header: ({ column }) => <SortableHeader column={column} title="Name" />,
    },

    {
      accessorKey: "code",

      meta: {
        title: "Code",
      },

      enableSorting: true,

      enableHiding: true,

      header: ({ column }) => <SortableHeader column={column} title="Code" />,
    },

    {
      accessorKey: "symbol",

      meta: {
        title: "Symbol",
      },

      enableSorting: true,

      enableHiding: true,

      header: ({ column }) => <SortableHeader column={column} title="Symbol" />,
    },

    {
      accessorKey: "decimal_places",

      meta: {
        title: "Decimal Places",
      },

      enableSorting: true,

      enableHiding: true,

      header: ({ column }) => (
        <SortableHeader column={column} title="Decimal Places" />
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
        <SortableHeader column={column} title="Sort Order" />
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
        <UnitStatusBadge isActive={Boolean(row.original.is_active)} />
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
        <SortableHeader column={column} title="Created" />
      ),

      cell: ({ row }) => formatDateTime(row.original.created_at),
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
        const unit = row.original;

        return (
          <DataTableActions
            onView={() => onView(unit)}
            onEdit={() => onEdit(unit)}
            onDelete={() => onDelete(unit)}
            onActivate={() => onActivate(unit)}
            onDeactivate={() => onDeactivate(unit)}
            isActive={Boolean(unit.is_active)}
          />
        );
      },
    },
  ];
}
