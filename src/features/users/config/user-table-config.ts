import { columns } from "../columns/user-columns";

import { userFilters } from "./filters";

import { userExportColumns } from "./user-export-columns";

import type { DataTableConfig, ExportColumn } from "../../../components/data-table";

import type { User } from "../types/user";

export const userTableConfig: DataTableConfig<User> = {

    title: "Users",

    storageKey: "users",

    searchPlaceholder: "Search users...",

    columns,

    filters: userFilters,

    exportColumns: userExportColumns as unknown as ExportColumn<User>[],

};