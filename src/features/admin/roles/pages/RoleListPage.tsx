import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
import { useRoles } from "../hooks/useRoles";
import { roleTableConfig } from "../config/role-table-config.ts";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/route-paths";
import type { Role } from "../types/role";
import { useState } from "react";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { notification } from "@/lib/notification";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

export default function RoleListPage() {

    const navigate = useNavigate();

    const table = useDataTable({
        storageKey: "roles",
    });

    const [ deleteRole, setDeleteRole, ] = useState<Role | null>(null);
    const deleteMutation = useDeleteRole();

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

    //Confirm delete
    const handleDelete = () => {

        if (!deleteRole) {
            return;
        }

        deleteMutation.mutate(
            deleteRole.id,
            {
                onSuccess: () => {
                    notification.success(
                        "Role deleted successfully.",
                        "The role account has been deleted."
                    );
                    setDeleteRole(null);
                },
                onError: () => {
                    notification.error(
                        "Unable to delete role.",
                        "Please try again."
                    );
                },
            }
        );
    };
    

    return (
        <>
            <DataTable
                config={roleTableConfig({
                
                    onView: (role) => {
                        navigate(
                            `${ROUTES.ROLES}/${role.id}`
                        );
                    },

                    onEdit: (role) => {
                        navigate(
                            `${ROUTES.ROLES}/${role.id}/edit`
                        );
                    },

                    onDelete: (role) => {
                        setDeleteRole(role);
                    },

                })}
                table={table as any}
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
                    <Link to={`${ROUTES.ROLES}/create`}>
                            Create Role
                        </Link>
                </Button>
            </DataTable>

            {/* Delete Confirmation */}
            <AlertDialog
                open={
                    Boolean(deleteRole)
                }
                onOpenChange={(
                    open
                ) => {

                    if (!open) {

                        setDeleteRole(
                            null
                        );

                    }

                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Role?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                {deleteRole?.display_name ||  deleteRole?.name || "this role"}
                            </span> ?
                            <br />
                            This action will remove the role from the roles list.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={
                                deleteMutation.isPending
                            }
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={
                                deleteMutation.isPending
                            }
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}