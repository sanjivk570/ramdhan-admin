import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
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

import {
    DataTable,
    useDataTable,
} from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";

import type { TaxClass } from "../types/tax-class";
import { taxClassTableConfig } from "../config/tax-class-table-config";
import { useTaxClasses } from "../hooks/useTaxClasses";
import {
    useDeleteTaxClass,
    useUpdateTaxClassStatus,
} from "../hooks/useTaxClassMutations";

export default function TaxClassListPage() {
    const navigate = useNavigate();

    const table = useDataTable({
        storageKey: "tax-classes",
    });

    const { data, isLoading } = useTaxClasses(
        table.query as any
    );

    const deleteMutation = useDeleteTaxClass();
    const statusMutation = useUpdateTaxClassStatus();

    const [deleteItem, setDeleteItem] =
        useState<TaxClass | null>(null);

    const [statusItem, setStatusItem] =
        useState<TaxClass | null>(null);

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

    const handleDelete = () => {
        if (!deleteItem) {
            return;
        }

        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => {
                setDeleteItem(null);

                notification.success(
                    "Tax class deleted successfully.",
                    "The tax class has been removed from the active list."
                );
            },
            onError: () => {
                notification.error(
                    "Unable to delete tax class.",
                    "Please try again."
                );
            },
        });
    };

    const handleStatusConfirm = () => {
        if (!statusItem || statusValue === null) {
            return;
        }

        statusMutation.mutate(
            {
                uuid: statusItem.uuid,
                status: statusValue,
            },
            {
                onSuccess: () => {
                    const activated = statusValue;

                    setStatusItem(null);
                    setStatusValue(null);

                    notification.success(
                        activated
                            ? "Tax class activated successfully."
                            : "Tax class deactivated successfully.",
                        activated
                            ? "The tax class is now active."
                            : "The tax class is now inactive."
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to update tax class status.",
                        "Please try again."
                    );
                },
            }
        );
    };

    return (
        <>
            <DataTable
                config={taxClassTableConfig({
                    onView: (item) =>
                        navigate(
                            `${ROUTES.TAX_CLASSES}/${item.uuid}`
                        ),

                    onEdit: (item) =>
                        navigate(
                            `${ROUTES.TAX_CLASSES}/${item.uuid}/edit`
                        ),

                    onDelete: (item) =>
                        setDeleteItem(item),

                    onActivate: (item) => {
                        setStatusItem(item);
                        setStatusValue(true);
                    },

                    onDeactivate: (item) => {
                        setStatusItem(item);
                        setStatusValue(false);
                    },
                })}
                table={table as any}
                rows={data?.data ?? []}
                meta={meta}
                loading={isLoading}
                emptyState={{
                    title: "No tax classes found",
                    description:
                        "Try another search or create a new tax class.",
                    actionLabel: "Create Tax Class",
                    onAction: () =>
                        navigate(`${ROUTES.TAX_CLASSES}/create`),
                }}
            >
                <Button asChild>
                    <Link to={`${ROUTES.TAX_CLASSES}/create`}>
                        Create Tax Class
                    </Link>
                </Button>
            </DataTable>

            <AlertDialog
                open={Boolean(deleteItem)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteItem(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete Tax Class?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                {deleteItem?.name || "this tax class"}
                            </span>
                            ?
                            <br />
                            This will remove the tax class from the active list.
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
                                ? "Activate Tax Class?"
                                : "Deactivate Tax Class?"}
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to{" "}
                            {statusValue
                                ? "activate"
                                : "deactivate"}{" "}
                            <span className="font-semibold text-foreground">
                                {statusItem?.name}
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
