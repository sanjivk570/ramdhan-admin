import { columns } from "../columns/role-columns.tsx";

import { roleFilters } from "./filters";

import { roleExportColumns } from "./role-export-columns.ts";

import type { DataTableConfig, ExportColumn } from "../../../components/data-table";

import type { Role } from "../types/./role.ts";

export const roleTableConfig: DataTableConfig<Role> = {
    title: "Roles",
    storageKey: "roles",
    searchPlaceholder: "Search roles...",
    columns,
    filters: roleFilters,
    exportColumns: roleExportColumns as unknown as ExportColumn<Role>[],
};