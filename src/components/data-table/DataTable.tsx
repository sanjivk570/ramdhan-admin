import React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type RowData,
} from "@tanstack/react-table";

import type { DataTableProps } from "./types";

import DataTableLoading from "./DataTableLoading";

import DataTableEmpty from "./DataTableEmpty";
import DataTableColumnVisibility from "./DataTableColumnVisibility";

export function DataTable<TData extends RowData>({
    columns,
    data,
    loading = false,
    pagination,
    pageCount,
    sorting,
    onPaginationChange,
    onSortingChange,
    emptyState,
    visibility,
    onVisibilityChange,
}: DataTableProps<TData>) {

    const table = useReactTable({

        data,

        columns,

        getCoreRowModel:
            getCoreRowModel(),

        state: {

            pagination,

            sorting,
            
            columnVisibility: visibility,

        },

        manualPagination: true,

        manualSorting: true,

        pageCount,

        onPaginationChange,

        onSortingChange,

        onColumnVisibilityChange: onVisibilityChange,

    });
    

    return (
        <>
        
        {/* <div className="mb-4 flex justify-end">

            <DataTableColumnVisibility

                table={table}

            />

        </div> */}

        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">

            <div>

                <h3 className="text-sm font-semibold">
                    Records
                </h3>

                <p className="text-xs text-muted-foreground">
                    Showing filtered results
                </p>

            </div>

            <DataTableColumnVisibility
                table={table}
            />

        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">

            <table className="w-full border-collapse">

                <thead className="sticky top-0 z-10 bg-background">

                {table
                    .getHeaderGroups()
                    .map(group => (

                        <tr key={group.id}>

                            {group.headers.map(header => (

                                <th
                                    key={header.id}
                                    className="h-12 border-b bg-muted/40 px-4
                                    text-left
                                    text-sm
                                    font-semibold
                                    text-muted-foreground
                                    uppercase
                                    tracking-wide
                                    whitespace-nowrap
                                    "
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>

                            ))}

                        </tr>

                    ))}

                </thead>

                <tbody>

                {/* {loading ? (

                    <tr>

                        <td
                            colSpan={columns.length}
                            className="p-6 text-center"
                        >
                            Loading...
                        </td>

                    </tr>

                )  */}

                {loading ? (
                    <DataTableLoading
                        columns={columns.length}
                        rows={pagination.pageSize}
                    />
                )

                : table.getRowModel().rows.length === 0 ? (

                    <tr>

                        {/* <td
                            colSpan={columns.length}
                            className="p-6 text-center"
                        >
                            No records found.
                        </td> */}

                        <td colSpan={columns.length}>

                            <DataTableEmpty

                                {...emptyState}

                            />

                        </td>

                    </tr>

                ) : (

                    table
                        .getRowModel()
                        .rows
                        .map(row => (

                            <tr
                                key={row.id}
                                className="
                                    border-b
                                    transition-colors
                                    even:bg-muted/20
                                    hover:bg-muted/40
                                "
>

                                {row
                                    .getVisibleCells()
                                    .map(cell => (

                                        <td
                                            key={cell.id}
                                            className="
                                            px-4
                                            py-3
                                            align-middle
                                            text-sm
                                            "
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>

                                    ))}

                            </tr>

                        ))

                )}

                </tbody>

            </table>

        </div>
    </>

    );

}