// import { DataTable } from "@/components/data-table";

// import { columns } from "../columns/user-columns";

// import { useUsers } from "../hooks/useUsers";



// export default function UserTable() {

//     const { data, isLoading } = useUsers({
//         page: 1,
//         per_page: 10,
//     });

//     return (
//         <DataTable
//             columns={columns}
//             data={data?.data ?? []}
//             loading={isLoading}
//             pagination={data?.meta}
//         />
//     );
// }

import { DataTable, DataTablePagination, useDataTable } from "@/components/data-table";
import { useNavigate } from "react-router-dom";

import { columns } from "../columns/user-columns";

import type { User } from "../types/user";
import type { DataTableMeta } from "@/components/data-table";

//import { useDataTable } from "@/components/data-table";

interface Props {

    table: ReturnType<typeof useDataTable>;

    users: User[];

    meta?: {

        current_page: number;

        per_page: number;

        total: number;

        last_page: number;

    };

    loading: boolean;

}

export default function UserTable({

    table,

    users,

    meta,

    loading,

}: Props) {
    const navigate = useNavigate();
    const paginationMeta: DataTableMeta | undefined = meta
        ? {
              ...meta,
              from: (meta.current_page - 1) * meta.per_page + 1,
              to: Math.min(meta.current_page * meta.per_page, meta.total),
          }
        : undefined;

    return (
        <>
        {/* <DataTable

            columns={columns}

            data={users}

            loading={loading}

            pagination={table.pagination}

            sorting={table.sorting}

            pageCount={meta?.last_page ?? 0}

            onPaginationChange={table.setPagination}

            onSortingChange={table.setSorting}

            onVisibilityChange={table.setVisibility}

            emptyState={{

                title: "No users found",

                description:
                    "Try another search or create a new user.",

                actionLabel: "Create User",

                onAction: () => {

                    navigate("/users/create");

                },

            }}

        /> */}

        <DataTable
            columns={columns}
            data={users}
            loading={loading}
            pagination={table.pagination}
            sorting={table.sorting}

            visibility={table.visibility}

            pageCount={meta?.last_page ?? 0}

            onPaginationChange={table.setPagination}
            onSortingChange={table.setSorting}

            onVisibilityChange={table.setVisibility}

            emptyState={{
                title: "No users found",
                description: "Try another search or create a new user.",
                actionLabel: "Create User",
                onAction: () => navigate("/users/create"),
            }}
        />

        <DataTablePagination

            meta={paginationMeta}

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

        </>
    );

}