import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getCustomerColumns,
    type CustomerColumnActions,
} from "../columns/customer-columns";
import type { Customer } from "../types/customer";

export const customerFilters = [
    { key: "first_name", label: "First Name", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "mobile", label: "Mobile", type: "text" },
    {
        key: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "1" },
            { label: "Inactive", value: "0" },
        ],
    },
] as const;

const customerExportColumns = [
    { key: "first_name", title: "First Name" },
    { key: "last_name", title: "Last Name" },
    { key: "email", title: "Email" },
    { key: "mobile", title: "Mobile" },
    { key: "is_active", title: "Status" },
    { key: "created_at", title: "Created" },
];

export function customerTableConfig(
    actions: CustomerColumnActions
): DataTableConfig<Customer> {
    return {
        title: "Customers",
        storageKey: "customers",
        searchPlaceholder: "Search customers by name or email...",
        columns: getCustomerColumns(actions),
        filters: customerFilters as unknown as DataTableConfig<Customer>["filters"],
        exportColumns:
            customerExportColumns as unknown as ExportColumn<Customer>[],
    };
}
