


// import UserToolbar from "../components/UserToolbar";
// import UserTable from "../components/UserTable";

// import { DataTable, DataTableToolbar, useDataTable } from "@/components/data-table";
// import { useUsers } from "@/features/users/hooks/useUsers";

// import { Button } from "@/components/ui/button";

// // import {
// //     DataTableToolbar,
// //     useDataTable,
// // } from "@/components/data-table";

// export default function UserListPage() {

//     const table = useDataTable();

//     const safeQuery = {
//         ...table.query,
//         sort_order: (table.query.sort_order === 'asc' || table.query.sort_order === 'desc')
//             ? table.query.sort_order
//             : undefined,
//     };

//     const {
//         data,
//         isLoading,
//         refetch,
//     } = useUsers(safeQuery);

//     const toolbarProps = {
//         table,
//         onRefresh: refetch,
//     } as any;

//     const userTableProps = {
//         table,
//         users: data?.data ?? [],
//         meta: data?.meta,
//         loading: isLoading,
//     } as any;

//     return (
//         <div className="space-y-6">

//             {/* <UserToolbar
//                 {...toolbarProps}
//             /> */}

//             {/* <DataTableToolbar
//                 search={table.search}
//                 setSearch={table.setSearch}
//                 resetFilters={table.resetFilters}
//                 onRefresh={refetch}
//             >
//                 <Button>
//                     Create User
//                 </Button>
//             </DataTableToolbar>

//             <UserTable
//                 {...userTableProps}
//             /> */}

//             <DataTableToolbar
//                 search={table.search}
//                 setSearch={table.setSearch}
//                 resetFilters={table.resetFilters}
//                 onRefresh={() => refetch()}
//             >
//                 <Button>
//                     Create User
//                 </Button>
//             </DataTableToolbar>

//             <UserTable
//                 table={table}
//                 users={data?.data ?? []}
//                 meta={data?.meta}
//                 loading={isLoading}
//             />

//         </div>
//     );
// }


import { Button } from "@/components/ui/button";

import { DataTableToolbar, useDataTable, DataTableFilters } from "@/components/data-table";

import UserTable from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";

import { userFilters } from "../config/filters";

import ExportCsvButton from "@/components/export/ExportCsvButton";

import { userExportColumns } from "../config/user-export-columns";

export default function UserListPage() {

    // const table = useDataTable();

    const table = useDataTable({
        storageKey: "users",
    });

    const {
        data,
        isLoading,
        refetch,
    } = useUsers(table.query);

    return (

        <div className="space-y-6">

            <DataTableToolbar
                search={table.search}
                setSearch={table.setSearch}
                resetFilters={table.resetFilters}
                onRefresh={() => refetch()}
            >
                <ExportCsvButton

                    filename="users"

                    columns={userExportColumns}

                    rows={data?.data ?? []}

                />

                <Button>
                    Create User
                </Button>
            </DataTableToolbar>

            <DataTableFilters
                filters={userFilters}
                values={table.filters as Record<string, string>}
                onChange={table.setFilter}
            />

            <UserTable
                table={table}
                users={data?.data ?? []}
                meta={data?.meta}
                loading={isLoading}
            />

        </div>

    );

}