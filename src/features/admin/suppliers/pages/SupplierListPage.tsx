import { useState } from "react";

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
import { useNavigate } from "react-router-dom";

import type { Supplier } from "../types/supplier";
import { useSuppliers } from "../hooks/useSupplierQueries";
import {
    useDeleteSupplier,
    useUpdateSupplierStatus,
} from "../hooks/useSupplierMutations";
import { supplierTableConfig } from "../config/supplier-table-config";

export default function SupplierListPage() {
    const table = useDataTable({ storageKey: "suppliers" });
    const navigate = useNavigate();

    const { data, isLoading } = useSuppliers(table.query as any);

    const deleteMutation = useDeleteSupplier();
    const statusMutation = useUpdateSupplierStatus();

    const [deleteItem, setDeleteItem] =
        useState<Supplier | null>(null);
    const [statusItem, setStatusItem] =
        useState<Supplier | null>(null);
    const [statusValue, setStatusValue] =
        useState<boolean | null>(null);

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

    const config = supplierTableConfig({
        onView: (supplier) =>
            navigate(`${ROUTES.SUPPLIERS}/${supplier.uuid}`),
        onEdit: (supplier) =>
            navigate(`${ROUTES.SUPPLIERS}/${supplier.uuid}/edit`),
        onDelete: (supplier) => setDeleteItem(supplier),
        onActivate: (supplier) => {
            setStatusItem(supplier);
            setStatusValue(true);
        },
        onDeactivate: (supplier) => {
            setStatusItem(supplier);
            setStatusValue(false);
        },
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => {
                setDeleteItem(null);
                notification.success(
                    "Supplier deleted successfully.",
                    "The supplier has been removed."
                );
            },
            onError: () =>
                notification.error(
                    "Unable to delete supplier.",
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
                            ? "Supplier activated."
                            : "Supplier deactivated.",
                                            statusValue
                            ? "The supplier has been activated."
                            : "The supplier has been deactivated."
                    );
                },
                onError: () =>
                    notification.error(
                        "Unable to update supplier status.",
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
                        Suppliers
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage supplier companies and their purchase orders.
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
                        <AlertDialogTitle>Delete Supplier?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {deleteItem?.company_name}
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
                    statusItem !== null &&
                    statusValue !== null
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
                                ? "Activate Supplier?"
                                : "Deactivate Supplier?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to{" "}
                            {statusValue
                                ? "activate"
                                : "deactivate"}{" "}
                            <span className="font-semibold text-foreground">
                                {statusItem?.company_name}
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
