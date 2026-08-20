import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { SortableHeader } from "@/components/data-table";

import { formatDateTime } from "@/lib/date";

import type { InventoryTransaction } from "../types/inventory";

export function getTransactionColumns(): ColumnDef<InventoryTransaction>[] {
  return [
    {
      accessorKey: "type",

      meta: {
        title: "Type",
      },

      enableSorting: true,
      enableHiding: true,

      header: ({ column }) => <SortableHeader column={column} title="Type" />,

      cell: ({ row }) => {
        const type = row.original.type;

        const isIn = type === "purchase" || type === "return";

        return (
          <Badge variant={isIn ? "default" : "secondary"}>
            {type
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </Badge>
        );
      },
    },

    {
      accessorKey: "quantity",

      meta: {
        title: "Quantity",
      },

      enableSorting: true,
      enableHiding: true,

      header: ({ column }) => (
        <SortableHeader column={column} title="Quantity" />
      ),
    },

    {
      accessorKey: "quantity_before",

      meta: {
        title: "Before",
      },

      enableSorting: true,
      enableHiding: true,

      header: "Before",
    },

    {
      accessorKey: "quantity_after",

      meta: {
        title: "After",
      },

      enableSorting: true,
      enableHiding: true,

      header: "After",
    },

    {
      accessorKey: "reference_type",

      meta: {
        title: "Reference",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Reference",

      cell: ({ row }) => (
        <div>
          <p className="text-sm">{row.original.reference_type || "-"}</p>

          <p
            className="
                        text-xs
                        text-muted-foreground
                    "
          >
            {row.original.reference_id || "-"}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "notes",

      meta: {
        title: "Notes",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Notes",

      cell: ({ row }) => (
        <span
          className="
                    block
                    max-w-[300px]
                    truncate
                    text-sm
                "
        >
          {row.original.notes || "-"}
        </span>
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
  ];
}
