import type { RowData } from "@tanstack/react-table";

import type {
    DataTableProps,
} from "./types";

import { DataTableToolbar } from "./DataTableToolbar";
import DataTableFilters from "./DataTableFilters";
import DataTableGrid from "./DataTableGrid";
import DataTablePagination from "./DataTablePagination";

import ExportCsvButton from "@/components/export/ExportCsvButton";

import type { CsvColumn } from "@/lib/csv";
import DataTableActiveFilters from "./DataTableActiveFilters";

export function DataTable<T extends RowData>({
    config,
    table,
    rows,
    meta,
    loading = false,
    emptyState,
    children,
}: DataTableProps<T>) {

    // Export columns may be configured with either
    // `{ label, formatter }` or `{ title, value }`.
    // Normalize them here for the CSV exporter.
    const exportColumns: CsvColumn<T>[] | undefined =
        config.exportColumns?.map((raw) => {
            const column =
                raw as unknown as {
                    key: keyof T;
                    title?: string;
                    label?: string;
                    formatter?: (row: T) => string;
                    value?: (
                        row: T
                    ) => string | number | boolean | null | undefined;
                };

            return {
                key: column.key,
                title:
                    column.title ??
                    column.label ??
                    String(column.key),
                value:
                    column.formatter ?? column.value,
            };
        });

    return (

        <div className="space-y-1">

            {/* Toolbar */}

            <DataTableToolbar

                search={table.search}

                setSearch={table.setSearch}

                resetFilters={table.resetFilters}
            >

                {config.exportColumns && (

                    <ExportCsvButton
                    

                        filename={config.storageKey}

                        columns={exportColumns ?? []}

                        rows={rows}
                    />

                )}

                {children}

            </DataTableToolbar>

            {/* Filters */}

            {config.filters && config.filters.length > 0 && (

                <DataTableFilters

                    filters={config.filters}

                    values={
                        table.filters as Record<string, string>
                    }

                    onChange={table.setFilter}

                />

            )}

            <DataTableActiveFilters
                search={table.search}

                filters={table.filters}

                sorting={table.sorting}

                filterConfig={config.filters ?? []}

                onSearchClear={table.clearSearch}

                onFilterRemove={table.removeFilter}

                onSortClear={table.clearSorting}

                onClearAll={table.resetFilters}
            />

            {/* Grid */}

            <DataTableGrid

                columns={config.columns}

                data={rows}

                loading={loading}

                pagination={table.pagination}

                pageCount={meta?.last_page ?? 0}

                sorting={table.sorting}

                visibility={table.visibility}

                emptyState={emptyState}

                onPaginationChange={table.setPagination}

                onSortingChange={table.setSorting}

                onVisibilityChange={table.setVisibility}

            />

            {/* Pagination */}

            {meta && (
                <DataTablePagination
                    meta={meta}
                    pageIndex={table.pagination.pageIndex}
                    pageSize={table.pagination.pageSize}
                    onPageChange={(pageIndex) =>
                        table.setPagination((old) => ({
                            ...old,
                            pageIndex,
                        }))
                    }

                    onPageSizeChange={(pageSize) =>
                        table.setPagination({
                            pageIndex: 0,
                            pageSize,
                        })

                    }

                />

            )}

        </div>

    );

}