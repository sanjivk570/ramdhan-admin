import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { SortableHeader } from "@/components/data-table";

import { formatDateTime } from "@/lib/date";

import type { InventoryStock } from "../types/inventory";

import InventoryStatusBadge from "../components/InventoryStatusBadge";

import StatusBadge from "@/components/common/StatusBadge";


export interface InventoryColumnActions {
  onView: (inventory: InventoryStock) => void;
}

export function getInventoryColumns({
  onView,
}: InventoryColumnActions): ColumnDef<InventoryStock>[] {
  return [
    {
      accessorKey: "product.name",

      meta: {
        title: "Product",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Product",

      cell: ({ row }) => row.original.product?.name || "-",
    },

    {
      accessorKey: "product_variant.name",

      meta: {
        title: "Variant",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Variant",

      cell: ({ row }) => row.original.product_variant?.name || "Default",
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

      cell: ({ row }) => (
        <span className="font-medium">{row.original.quantity}</span>
      ),
    },

    {
      accessorKey: "reserved_quantity",

      meta: {
        title: "Reserved",
      },

      enableSorting: true,
      enableHiding: true,

      header: ({ column }) => (
        <SortableHeader column={column} title="Reserved" />
      ),
    },

    {
      id: "available_quantity",

      meta: {
        title: "Available",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Available",

      cell: ({ row }) => {
        const available = Math.max(
          0,
          row.original.quantity - row.original.reserved_quantity
        );

        return <span className="font-medium">{available}</span>;
      },
    },

    {
      accessorKey: "low_stock_threshold",

      meta: {
        title: "Low Stock Threshold",
      },

      enableSorting: true,
      enableHiding: true,

      header: "Low Stock",

      cell: ({ row }) => row.original.low_stock_threshold,
    },

    {
      id: "stock_status",

      meta: {
        title: "Stock Status",
      },

      enableSorting: false,
      enableHiding: true,

      header: "Stock Status",

      cell: ({ row }) => (
        <InventoryStatusBadge
          quantity={row.original.quantity}
          lowStockThreshold={row.original.low_stock_threshold}
        />
      ),
    },

    {
      accessorKey: "is_active",

      meta: {
        title: "Status",
      },

      enableSorting: true,
      enableHiding: true,

      header: "Status",

      cell: ({ row }) => (
        <StatusBadge isActive={Boolean(row.original.is_active)} />
      ),
    },

    {
      accessorKey: "updated_at",

      meta: {
        title: "Updated",
      },

      enableSorting: true,
      enableHiding: true,

      header: ({ column }) => (
        <SortableHeader column={column} title="Updated" />
      ),

      cell: ({ row }) => formatDateTime(row.original.updated_at),
    },

    {
      id: "actions",

      header: "Actions",

      meta: {
        title: "Actions",
      },

      enableSorting: false,
      enableHiding: false,

      size: 80,

      cell: ({ row }) => (
        <button
          type="button"
          className="
                        text-sm
                        font-medium
                        text-primary
                        hover:underline
                    "
          onClick={() => onView(row.original)}
        >
          View
        </button>
      ),
    },
  ];
}
