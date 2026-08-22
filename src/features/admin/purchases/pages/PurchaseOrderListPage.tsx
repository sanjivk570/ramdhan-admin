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

import type { PurchaseOrder } from "../types/purchase";
import { usePurchaseOrders } from "../hooks/usePurchaseQueries";
import {
    useApprovePurchaseOrder,
    useCancelPurchaseOrder,
    useSubmitPurchaseOrder,
} from "../hooks/usePurchaseMutations";
import { purchaseOrderTableConfig } from "../config/purchase-table-configs";

type PendingAction = "submit" | "approve" | "cancel";

const ACTION_LABELS: Record<PendingAction, string> = {
    submit: "Submit",
    approve: "Approve",
    cancel: "Cancel",
};

export default function PurchaseOrderListPage() {
    const table = useDataTable({
        storageKey: "purchase-orders",
    });

    const { data, isLoading } = usePurchaseOrders(
        table.query as any
    );

    const submitMutation = useSubmitPurchaseOrder();
    const approveMutation = useApprovePurchaseOrder();
    const cancelMutation = useCancelPurchaseOrder();

    const [pendingItem, setPendingItem] =
        useState<PurchaseOrder | null>(null);
    const [pendingAction, setPendingAction] =
        useState<PendingAction | null>(null);

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

    const config = purchaseOrderTableConfig({
        onSubmit: (order) => {
            setPendingItem(order);
            setPendingAction("submit");
        },
        onApprove: (order) => {
            setPendingItem(order);
            setPendingAction("approve");
        },
        onCancel: (order) => {
            setPendingItem(order);
            setPendingAction("cancel");
        },
    });

    const mutation =
        pendingAction === "submit"
            ? submitMutation
            : pendingAction === "approve"
              ? approveMutation
              : cancelMutation;

    const handleConfirm = () => {
        if (!pendingItem || !pendingAction) {
            return;
        }

        mutation.mutate(pendingItem.uuid, {
            onSuccess: () => {
                notification.success(
                    `Purchase order ${pendingAction}ed successfully.`,
                    `The purchase order has been ${pendingAction}ed.`
                );
                setPendingItem(null);
                setPendingAction(null);
            },
            onError: () => {
                notification.error(
                    "Unable to update purchase order.",
                    "Please try again."
                );
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Purchase Orders
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage supplier purchase orders.
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
                open={
                    pendingItem !== null &&
                    pendingAction !== null
                }
                onOpenChange={(open) => {
                    if (!open) {
                        setPendingItem(null);
                        setPendingAction(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {pendingAction
                                ? `${ACTION_LABELS[pendingAction]} Purchase Order?`
                                : ""}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to{" "}
                            <span className="capitalize font-medium">
                                {pendingAction}
                            </span>{" "}
                            purchase order{" "}
                            <span className="font-semibold text-foreground">
                                {pendingItem?.po_number ||
                                    pendingItem?.uuid}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={mutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                handleConfirm();
                            }}
                            className={
                                pendingAction === "cancel"
                                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    : ""
                            }
                        >
                            {mutation.isPending
                                ? "Working..."
                                : pendingAction
                                  ? ACTION_LABELS[pendingAction]
                                  : "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

