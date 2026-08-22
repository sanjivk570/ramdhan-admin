import type { ColumnDef } from "@tanstack/react-table";

import {
    SortableHeader,
    DataTableActions,
} from "@/components/data-table";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import type { Supplier } from "../types/supplier";

export interface SupplierColumnActions {
    onView: (supplier: Supplier) => void;
    onEdit: (supplier: Supplier) => void;
    onDelete: (supplier: Supplier) => void;
    onActivate: (supplier: Supplier) => void;
    onDeactivate: (supplier: Supplier) => void;
}

export function getSupplierColumns({
    onView,
    onEdit,
    onDelete,
    onActivate,
    onDeactivate,
}: SupplierColumnActions): ColumnDef<Supplier>[] {
    return [
        {
            accessorKey: "company_name",
            meta: { title: "Company Name" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Company Name" />
            ),
        },
        {
            accessorKey: "contact_person",
            meta: { title: "Contact Person" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Contact Person" />
            ),
            cell: ({ row }) => row.original.contact_person || "-",
        },
        {
            accessorKey: "email",
            meta: { title: "Email" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "mobile",
            meta: { title: "Mobile" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Mobile" />
            ),
            cell: ({ row }) =>
                row.original.mobile
                    ? `${row.original.country_code ?? ""}${row.original.mobile}`
                    : "-",
        },
        {
            accessorKey: "gstin",
            meta: { title: "GSTIN" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="GSTIN" />
            ),
            cell: ({ row }) => row.original.gstin || "-",
        },
        {
            accessorKey: "credit_limit",
            meta: { title: "Credit Limit" },
            enableSorting: true,
            enableHiding: true,
            header: ({ column }) => (
                <SortableHeader column={column} title="Credit Limit" />
            ),
            cell: ({ row }) =>
                row.original.credit_limit
                    ? `₹${Number(row.original.credit_limit).toLocaleString("en-IN")}`
                    : "-",
        },
        {
            accessorKey: "is_active",
            meta: { title: "Status" },
            header: "Status",
            enableSorting: true,
            enableHiding: true,
            cell: ({ row }) => (
                <StatusBadge isActive={Boolean(row.original.is_active)} />
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
                const supplier = row.original;
                return (
                    <DataTableActions
                        onView={() => onView(supplier)}
                        onEdit={() => onEdit(supplier)}
                        onDelete={() => onDelete(supplier)}
                        onActivate={() => onActivate(supplier)}
                        onDeactivate={() => onDeactivate(supplier)}
                        isActive={supplier.is_active}
                    />
                );
            },
        },
    ];
}