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

import type { TaxRate } from "../types/tax-rate";
import { taxRateTableConfig } from "../config/tax-rate-table-config";
import { useTaxRates } from "../hooks/useTaxRates";
import {
    useDeleteTaxRate,
    useUpdateTaxRateStatus,
} from "../hooks/useTaxRateMutations";

export default function TaxRateListPage() {
    const navigate = useNavigate();

    const table = useDataTable({
        storageKey: "tax-rates",
    });

    const { data, isLoading } = useTaxRates(
        table.query as any
    );

    const deleteMutation = useDeleteTaxRate();
    const statusMutation = useUpdateTaxRateStatus();

    const [deleteItem, setDeleteItem] =
        useState<TaxRate | null>(null);

    const [statusItem, setStatusItem] =
        useState<TaxRate | null>(null);

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
                    "Tax rate deleted successfully.",
                    "The tax rate has been removed from the active list."
                );
            },
            onError: () => {
                notification.error(
                    "Unable to delete tax rate.",
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
                            ? "Tax rate activated successfully."
                            : "Tax rate deactivated successfully.",
                        activated
                            ? "The tax rate is now active."
                            : "The tax rate is now inactive."
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to update tax rate status.",
                        "Please try again."
                    );
                },
            }
        );
    };

    return (
        <>
            <DataTable
                config={taxRateTableConfig({
                    onView: (item) =>
                        navigate(
                            `${ROUTES.TAX_RATES}/${item.uuid}`
                        ),

                    onEdit: (item) =>
                        navigate(
                            `${ROUTES.TAX_RATES}/${item.uuid}/edit`
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
                    title: "No tax rates found",
                    description:
                        "Try another search or create a new tax rate.",
                    actionLabel: "Create Tax Rate",
                    onAction: () =>
                        navigate(`${ROUTES.TAX_RATES}/create`),
                }}
            >
                <Button asChild>
                    <Link to={`${ROUTES.TAX_RATES}/create`}>
                        Create Tax Rate
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
                            Delete Tax Rate?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-foreground">
                                {deleteItem?.name || "this tax rate"}
                            </span>
                            ?
                            <br />
                            This will remove the tax rate from the active list.
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
                                ? "Activate Tax Rate?"
                                : "Deactivate Tax Rate?"}
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
