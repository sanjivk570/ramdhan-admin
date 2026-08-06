import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
import { useUsers } from "../hooks/useUsers";
import { userTableConfig } from "../config/user-table-config";
import { ROUTES } from "../../../app/router/route-paths";
import { Link, useNavigate } from "react-router-dom";

export default function UserListPage() {
    const table = useDataTable({
        storageKey: "users",
    });

    const navigate = useNavigate();

    const {data, isLoading } = useUsers(table.query as any);

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
            //config={userTableConfig}

            config={userTableConfig({

                onView: (user) => {

                    navigate(
                        `${ROUTES.USERS}/${user.uuid}`
                    );

                },

                onEdit: (user) => {

                    navigate(
                        `${ROUTES.USERS}/${user.uuid}/edit`
                    );

                },

                onDelete: (user) => {

                    console.log(
                        "Delete:",
                        user.uuid
                    );

                },

                onActivate: (user) => {

                    console.log(
                        "Activate:",
                        user.uuid
                    );

                },

                onDeactivate: (user) => {

                    console.log(
                        "Deactivate:",
                        user.uuid
                    );

                },

            })}
            table={table}
            rows={data?.data ?? []}
            meta={meta}
            loading={isLoading}
            emptyState={{
                title: "No users found",
                description: "Try another search or create a new user.",
                actionLabel: "Create User",
                onAction: () => {
                    console.log("Create User");
                },
            }}
        >
            <Button>
                <Link to={`${ROUTES.USERS}/create`}>
                    Create User
                </Link>
            </Button>
        </DataTable>
    );
}