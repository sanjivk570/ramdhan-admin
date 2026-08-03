import type { RowData } from "@tanstack/react-table";

import type {
    DataTableProps,
} from "./types";

import { DataTableToolbar } from "./DataTableToolbar";
import DataTableFilters from "./DataTableFilters";
import DataTableGrid from "./DataTableGrid";
import DataTablePagination from "./DataTablePagination";

import ExportCsvButton from "@/components/export/ExportCsvButton";
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

                        columns={config.exportColumns}

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