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
        
        <div className="mb-4 flex justify-end">

            <DataTableColumnVisibility

                table={table}

            />

        </div>

        <div className="rounded-md border">

            <table className="w-full">

                <thead>

                {table
                    .getHeaderGroups()
                    .map(group => (

                        <tr key={group.id}>

                            {group.headers.map(header => (

                                <th
                                    key={header.id}
                                    className="border-b p-3 text-left"
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

                            <tr key={row.id}>

                                {row
                                    .getVisibleCells()
                                    .map(cell => (

                                        <td
                                            key={cell.id}
                                            className="border-b p-3"
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