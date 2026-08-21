import { type RoleColumnActions, getRoleColumns, } from "../columns/role-columns";

import { roleFilters } from "./filters";

import { roleExportColumns } from "./role-export-columns.ts";

import type { DataTableConfig, ExportColumn } from "@/components/data-table";

import type { Role } from "../types/role.ts";

export function roleTableConfig(
    actions: RoleColumnActions
): DataTableConfig<Role> {
    return{
        title: "Roles",
        storageKey: "roles",
        searchPlaceholder: "Search roles...",
        columns: getRoleColumns(actions),
        filters: roleFilters,
        exportColumns: roleExportColumns as unknown as ExportColumn<Role>[],
    }
};