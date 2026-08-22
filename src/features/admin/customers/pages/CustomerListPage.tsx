import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DataTable, useDataTable } from "@/components/data-table";
import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";

import type { Customer } from "../types/customer";
import { useCustomers } from "../hooks/useCustomerQueries";
import {
    useDeleteCustomer,
    useUpdateCustomerStatus,
} from "../hooks/useCustomerMutations";
import { customerTableConfig } from "../config/customer-table-config";

export default function CustomerListPage() {
    const navigate = useNavigate();
    const table = useDataTable({ storageKey: "customers" });

    const { data, isLoading } = useCustomers(table.query as any);

    const deleteMutation = useDeleteCustomer();
    const statusMutation = useUpdateCustomerStatus();

    const [deleteItem, setDeleteItem] =
        useState<Customer | null>(null);
    const [statusItem, setStatusItem] =
        useState<Customer | null>(null);
    const [statusValue, setStatusValue] = useState<
        boolean | null
    >(null);

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
                  data.meta.total
              ),
          }
        : undefined;

    const config = customerTableConfig({
        onView: (customer) =>
            navigate(`${ROUTES.CUSTOMERS}/${customer.uuid}`),
        onEdit: (customer) =>
            navigate(`${ROUTES.CUSTOMERS}/${customer.uuid}/edit`),
        onDelete: (customer) => setDeleteItem(customer),
        onActivate: (customer) => {
            setStatusItem(customer);
            setStatusValue(true);
        },
        onDeactivate: (customer) => {
            setStatusItem(customer);
            setStatusValue(false);
        },
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => {
                setDeleteItem(null);
                notification.success(
                    "Customer deleted successfully.",
                    "The customer has been removed."
                );
            },
            onError: () =>
                notification.error(
                    "Unable to delete customer.",
                    "Please try again."
                ),
        });
    };

    const handleStatusConfirm = () => {
        if (!statusItem || statusValue === null) return;
        statusMutation.mutate(
            { uuid: statusItem.uuid, status: statusValue },
            {
                onSuccess: () => {
                    setStatusItem(null);
                    setStatusValue(null);
                    notification.success(
                        statusValue
                            ? "Customer activated."
                            : "Customer deactivated.",
                        "The customer status has been updated."
                    );
                },
                onError: () =>
                    notification.error(
                        "Unable to update status.",
                        "Please try again."
                    ),
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Customers
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage store customers and their status.
                    </p>
                </div>

                <DataTable
                    config={config}
                    table={table as any}
                    rows={data?.data ?? []}
                    meta={meta}
                    loading={isLoading}
                />
            </div>

            <AlertDialog
                open={deleteItem !== null}
                onOpenChange={(open) => {
                    if (!open) setDeleteItem(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Customer?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {deleteItem?.first_name}{" "}
                                {deleteItem?.last_name}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={deleteMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
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

            <AlertDialog
                open={
                    statusItem !== null && statusValue !== null
                }
                onOpenChange={(open) => {
                    if (!open) {
                        setStatusItem(null);
                        setStatusValue(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {statusValue
                                ? "Activate Customer?"
                                : "Deactivate Customer?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to{" "}
                            {statusValue
                                ? "activate"
                                : "deactivate"}{" "}
                            <span className="font-semibold text-foreground">
                                {statusItem?.first_name}{" "}
                                {statusItem?.last_name}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={statusMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={statusMutation.isPending}
                            onClick={handleStatusConfirm}
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
