import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableActions, SortableHeader } from "@/components/data-table";
import { formatDateTime } from "@/lib/date";
import type { Product } from "../types/product";

export interface ProductColumnActions {
    onView: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onActivate: (product: Product) => void;
    onDeactivate: (product: Product) => void;
}

export function getProductColumns(
    actions: ProductColumnActions
): ColumnDef<Product>[] {
    return [
        {
            accessorKey: "name",
            meta: { title: "Product" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Product" />
            ),
            cell: ({ row }) => (
                <div className="min-w-[220px]">
                    <div className="font-medium">{row.original.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                        {row.original.sku}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "price",
            meta: { title: "Price" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Price" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    ₹{Number(row.original.price).toLocaleString("en-IN")}
                </span>
            ),
        },
        {
            accessorKey: "stock_quantity",
            meta: { title: "Stock" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Stock" />
            ),
            cell: ({ row }) => {
                const p = row.original;
                const low = p.stock_quantity <= p.low_stock_threshold;
                return (
                    <div>
                        <span className={low ? "font-semibold text-destructive" : "font-medium"}>
                            {p.stock_quantity}
                        </span>
                        <div className="text-xs text-muted-foreground">
                            {low ? "Low stock" : "In stock"}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "is_featured",
            meta: { title: "Featured" },
            enableSorting: true,
            enableHiding: true,
            header: "Featured",
            cell: ({ row }) => (
                <Badge variant={row.original.is_featured ? "default" : "secondary"}>
                    {row.original.is_featured ? "Yes" : "No"}
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
                <Badge variant={row.original.is_active ? "default" : "secondary"}>
                    {row.original.is_active ? "Active" : "Inactive"}
                </Badge>
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
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <DataTableActions
                        onView={() => actions.onView(product)}
                        onEdit={() => actions.onEdit(product)}
                        onDelete={() => actions.onDelete(product)}
                        onActivate={() => actions.onActivate(product)}
                        onDeactivate={() => actions.onDeactivate(product)}
                        isActive={product.is_active}
                    />
                );
            },
        },
    ];
}
