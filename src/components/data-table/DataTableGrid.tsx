import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import type {
    DataTableGridProps,
} from "./types";

import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";
import DataTableColumnVisibility from "./DataTableColumnVisibility";

export default function DataTableGrid<T>({
    columns,
    data,
    loading = false,
    pagination,
    pageCount,
    sorting,
    visibility,
    emptyState,
    onPaginationChange,
    onSortingChange,
    onVisibilityChange,
}: DataTableGridProps<T>) {

    const table = useReactTable({

        data,

        columns,

        getCoreRowModel: getCoreRowModel(),

        manualPagination: true,

        manualSorting: true,

        pageCount,

        state: {

            pagination,

            sorting,

            columnVisibility: visibility,

        },

        onPaginationChange,

        onSortingChange,

        onColumnVisibilityChange: onVisibilityChange,

    });

    return (

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm mt-4">

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

            <table className="w-full border-collapse">

                <thead className="sticky top-0 z-10 bg-background">

                    {table
                        .getHeaderGroups()
                        .map(group => (

                            <tr key={group.id}>

                                {group.headers.map(header => (

                                    <th
                                        key={header.id}
                                        className="
                                            h-12
                                            border-b
                                            bg-muted/40
                                            px-4
                                            text-left
                                            text-sm
                                            font-semibold
                                            uppercase
                                            tracking-wide
                                            text-muted-foreground
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

                    {loading ? (

                        <DataTableLoading

                            columns={columns.length}

                            rows={pagination.pageSize}

                        />

                    ) : table.getRowModel().rows.length === 0 ? (

                        <tr>

                            <td colSpan={columns.length}>

                                <DataTableEmpty

                                    {...emptyState}

                                />

                            </td>

                        </tr>

                    ) : (

                        table.getRowModel().rows.map(row => (

                            <tr

                                key={row.id}

                                className="
                                    border-b
                                    even:bg-muted/20
                                    hover:bg-muted/40
                                    transition-colors
                                "

                            >

                                {row.getVisibleCells().map(cell => (

                                    <td

                                        key={cell.id}

                                        className="
                                            px-4
                                            py-3
                                            text-sm
                                            align-middle
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

    );

}