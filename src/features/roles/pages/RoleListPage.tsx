import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
import { useRoles } from "../hooks/useRoles";
import { roleTableConfig } from "../config/role-table-config.ts";
export default function RoleListPage() {

    // return(
    //     "sfsdf"
    // )
    const table = useDataTable({
        storageKey: "roles",
    });

    const {data, isLoading } = useRoles(table.query as any);
    const meta = data?.meta
        ? {
            ...data.meta,
            from:
                (data.meta.current_page - 1) *
                    data.meta.per_page +
                1,
            to: Math.min(
                data.meta.current_page *
                    data.meta.per_page,
                data.meta.total,
            ),
        }
        : undefined;
    return (
        <DataTable
            config={roleTableConfig}
            table={table}
            rows={data?.data ?? []}
            meta={meta}
            loading={isLoading}
            emptyState={{
                title: "No roles found",
                description: "Try another search or create a new role.",
                actionLabel: "Create Role",
                onAction: () => {
                    console.log("Create Role");
                },
            }}
        >
            <Button>
                Create Role
            </Button>
        </DataTable>
    );
}