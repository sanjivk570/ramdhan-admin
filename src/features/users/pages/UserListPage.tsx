import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";
import { useUsers } from "../hooks/useUsers";
import { userTableConfig } from "../config/user-table-config";
import { ROUTES } from "../../../app/router/route-paths";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

import type { User } from "../types/user";

import { useDeleteUser } from "../hooks/useDeleteUser";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

export default function UserListPage() {
    const table = useDataTable({
        storageKey: "users",
    });

    const navigate = useNavigate();

    const {data, isLoading } = useUsers(table.query as any);

    const [ deleteUser, setDeleteUser, ] = useState<User | null>(null);
    const deleteMutation = useDeleteUser();

    const [ statusUser, setStatusUser, ] = useState<User | null>(null); const [ statusValue, setStatusValue, ] = useState<boolean | null>(null); const statusMutation = useUpdateUserStatus();

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

        if (!deleteUser) {
            return;
        }

        deleteMutation.mutate(
            deleteUser.uuid,
            {
                onSuccess: () => {

                    setDeleteUser(null);

                },
            }
        );
    };

    const handleStatusConfirm = () => {
        if (
            !statusUser ||
            statusValue === null
        ) {
            return;
        }
        statusMutation.mutate(
            {
                uuid: statusUser.uuid,
                status: statusValue,
            },
            {
                onSuccess: () => {
                    setStatusUser(null);
                    setStatusValue(null);
                },
            }
        );
    };


    return (
        <>
            <DataTable
            
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
                        setDeleteUser(user);
                    },

                    onActivate: (user) => {
                        setStatusUser(user); 
                        setStatusValue(true);
                    },

                    onDeactivate: (user) => {
                        setStatusUser(user); 
                        setStatusValue(false);
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

            {/* Delete Confirmation */}
            <AlertDialog
                open={
                    Boolean(deleteUser)
                }
                onOpenChange={(
                    open
                ) => {

                    if (!open) {

                        setDeleteUser(
                            null
                        );

                    }

                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete User?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                {deleteUser?.first_name ||  deleteUser?.email || "this user"}
                            </span> ?
                            <br />
                            This action will remove the user from the users list.
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

            {/* Activate and deactivate confirmation */}
            <AlertDialog
                open={
                    statusUser !== null &&
                    statusValue !== null
                }
                onOpenChange={(open) => {

                    if (!open) {

                        setStatusUser(null);
                        setStatusValue(null);

                    }

                }}
            >

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>

                            {statusValue
                                ? "Activate User?"
                                : "Deactivate User?"}

                        </AlertDialogTitle>

                        <AlertDialogDescription>

                            Are you sure you want to{" "}

                            {statusValue
                                ? "activate"
                                : "deactivate"}

                            {" "}

                            <span className="font-semibold text-foreground">

                                {statusUser?.first_name}{" "}
                                {statusUser?.last_name}

                            </span>
                            ?

                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogCancel
                            disabled={
                                statusMutation.isPending
                            }
                        >
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            disabled={
                                statusMutation.isPending
                            }
                            onClick={
                                handleStatusConfirm
                            }
                        >

                            {statusMutation.isPending
                                ? "Updating..."
                                : statusValue
                                    ? "Activate"
                                    : "Deactivate"}

                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>

        </>
    );
}