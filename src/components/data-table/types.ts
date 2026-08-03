import type {
    ColumnDef,
    PaginationState,
    SortingState,
    Updater,
    VisibilityState,
} from "@tanstack/react-table";

import type { ReactNode } from "react";

/*
|--------------------------------------------------------------------------
| Filter
|--------------------------------------------------------------------------
*/

export interface DataTableFilterOption {

    label: string;

    value: string;

}

export interface DataTableFilter {

    key: string;

    label: string;

    type: "text" | "select";

    placeholder?: string;

    options?: DataTableFilterOption[];

}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export interface ExportColumn<T = any> {

    key: keyof T | string;

    label: string;

    formatter?: (row: T) => string;

}

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/

export interface DataTableConfig<T> {

    /**
     * Table Title
     */
    title: string;

    /**
     * LocalStorage Key
     */
    storageKey: string;

    /**
     * Search Placeholder
     */
    searchPlaceholder?: string;

    /**
     * Table Columns
     */
    columns: ColumnDef<T>[];

    /**
     * Filters
     */
    filters?: DataTableFilter[];

    /**
     * Export Columns
     */
    exportColumns?: ExportColumn<T>[];

}

/*
|--------------------------------------------------------------------------
| Meta
|--------------------------------------------------------------------------
*/

export interface DataTableMeta {

    current_page: number;

    last_page: number;

    per_page: number;

    total: number;

    from: number;

    to: number;

}

/*
|--------------------------------------------------------------------------
| Query
|--------------------------------------------------------------------------
*/

export interface DataTableQuery {

    page: number;

    per_page: number;

    search?: string;

    sort_by?: string;

    sort_order?: "asc" | "desc";

    filters?: Record<string, unknown>;

}

/*
|--------------------------------------------------------------------------
| Empty State
|--------------------------------------------------------------------------
*/

export interface DataTableEmptyState {

    title?: string;

    description?: string;

    actionLabel?: string;

    onAction?: () => void;

}

/*
|--------------------------------------------------------------------------
| Hook State
|--------------------------------------------------------------------------
*/

export interface DataTableState {

    search: string;

    filters: Record<string, unknown>;

    sorting: SortingState;

    pageSize: number;

    visibility: VisibilityState;

}

/*
|--------------------------------------------------------------------------
| useDataTable Return Type
|--------------------------------------------------------------------------
*/

export interface DataTableHook {

    query: DataTableQuery;

    search: string;

    setSearch: (
        value: string
    ) => void;

    filters: Record<string, unknown>;

    setFilters: React.Dispatch<
        React.SetStateAction<
            Record<string, unknown>
        >
    >;

    setFilter: (
        key: string,
        value: string
    ) => void;

    sorting: SortingState;

    setSorting: React.Dispatch<
        React.SetStateAction<
            SortingState
        >
    >;

    pagination: PaginationState;

    setPagination: React.Dispatch<
        React.SetStateAction<
            PaginationState
        >
    >;

    visibility: VisibilityState;

    setVisibility: React.Dispatch<
        React.SetStateAction<
            VisibilityState
        >
    >;

    resetFilters: () => void;

}

/*
|--------------------------------------------------------------------------
| DataTable Props
|--------------------------------------------------------------------------
*/

export interface DataTableProps<T> {

    /**
     * Generic Config
     */
    config: DataTableConfig<T>;

    /**
     * Hook
     */
    table: DataTableHook;

    /**
     * API Rows
     */
    rows: T[];

    /**
     * Laravel Pagination
     */
    meta?: DataTableMeta;

    /**
     * Loading
     */
    loading?: boolean;

    /**
     * Empty State
     */
    emptyState?: DataTableEmptyState;

    /**
     * Header Actions
     */
    children?: ReactNode;

}

/*
|--------------------------------------------------------------------------
| Internal Grid Props
|--------------------------------------------------------------------------
*/

export interface DataTableGridProps<T> {

    columns: ColumnDef<T>[];

    data: T[];

    loading?: boolean;

    pagination: PaginationState;

    pageCount: number;

    sorting: SortingState;

    visibility: VisibilityState;

    emptyState?: DataTableEmptyState;

    onPaginationChange: (
        updater: Updater<PaginationState>
    ) => void;

    onSortingChange: (
        updater: Updater<SortingState>
    ) => void;

    onVisibilityChange: (
        updater: Updater<VisibilityState>
    ) => void;

}