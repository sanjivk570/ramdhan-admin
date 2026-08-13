import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
    DataTableActions,
    SortableHeader,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import type { TaxRate } from "../types/tax-rate";

export interface TaxRateColumnActions {
    onView: (taxRate: TaxRate) => void;
    onEdit: (taxRate: TaxRate) => void;
    onDelete: (taxRate: TaxRate) => void;
    onActivate: (taxRate: TaxRate) => void;
    onDeactivate: (taxRate: TaxRate) => void;
}

export function getTaxRateColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: TaxRateColumnActions): ColumnDef<TaxRate>[] {
    return [
        {
            accessorKey: "name",
            meta: { title: "Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "tax_class_uuid",
            meta: { title: "Tax Class" },
            enableSorting: false,
            enableHiding: true,
            header: "Tax Class",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">
                        {row.original.tax_class?.name ||
                            row.original.tax_class_uuid ||
                            "-"}
                    </p>

                    {row.original.tax_class?.code && (
                        <p className="font-mono text-xs text-muted-foreground">
                            {row.original.tax_class.code}
                        </p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "rate",
            meta: { title: "Rate" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Rate" />
            ),
            cell: ({ row }) => (
                <span className="font-medium">
                    {Number(row.original.rate).toFixed(2)}%
                </span>
            ),
        },
        {
            accessorKey: "country_code",
            meta: { title: "Country" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Country" />
            ),
            cell: ({ row }) =>
                row.original.country_code || "-",
        },
        {
            accessorKey: "state_code",
            meta: { title: "State" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="State" />
            ),
            cell: ({ row }) =>
                row.original.state_code || "All",
        },
        {
            accessorKey: "priority",
            meta: { title: "Priority" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Priority" />
            ),
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            enableSorting: true,
            enableHiding: true,
            header: "Status",
            cell: ({ row }) => (
                <Badge
                    variant={
                        row.original.is_active
                            ? "default"
                            : "secondary"
                    }
                >
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
            cell: ({ row }) =>
                formatDateTime(row.original.created_at),
        },
        {
            id: "actions",
            header: "Actions",
            meta: { title: "Actions" },
            enableSorting: false,
            enableHiding: false,
            size: 60,
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <DataTableActions
                        onView={() => onView(item)}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item)}
                        onActivate={() => onActivate(item)}
                        onDeactivate={() => onDeactivate(item)}
                        isActive={item.is_active}
                    />
                );
            },
        },
    ];
}
