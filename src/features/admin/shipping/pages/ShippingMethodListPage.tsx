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
import type { ShippingMethod } from "../types/shipping";
import { useShippingMethods } from "../hooks/useShippingQueries";
import { useDeleteMethod, useMethodStatus } from "../hooks/useShippingMutations";
import { shippingMethodTableConfig } from "../config/shipping-method-table-config";

export default function ShippingMethodListPage() {
    const table = useDataTable({ storageKey: "shipping-methods" });
    const { data, isLoading } = useShippingMethods(table.query as any);
    const deleteMutation = useDeleteMethod();
    const statusMutation = useMethodStatus();

    const [deleteItem, setDeleteItem] = useState<ShippingMethod | null>(null);
    const [statusItem, setStatusItem] = useState<ShippingMethod | null>(null);
    const [statusValue, setStatusValue] = useState<boolean | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from: (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(data.meta.current_page * data.meta.per_page, data.meta.total),
          }
        : undefined;

        const config = shippingMethodTableConfig({
        onView: () => {},
        onEdit: () => {},
        onDelete: (method) => setDeleteItem(method),
        onActivate: (method) => { setStatusItem(method); setStatusValue(true); },
        onDeactivate: (method) => { setStatusItem(method); setStatusValue(false); },
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => { setDeleteItem(null); notification.success("Method deleted."); },
            onError: () => notification.error("Unable to delete method."),
        });
    };

    const handleStatus = () => {
        if (!statusItem || statusValue === null) return;
        statusMutation.mutate(
            { uuid: statusItem.uuid, status: statusValue },
            {
                onSuccess: () => {
                    setStatusItem(null);
                    setStatusValue(null);
                    notification.success(statusValue ? "Method activated." : "Method deactivated.");
                },
                onError: () => notification.error("Unable to update method status."),
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Shipping Methods
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage shipping carriers and delivery methods.
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
                onOpenChange={(open) => { if (!open) setDeleteItem(null); }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Method?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                {deleteItem?.name}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
                            onClick={(event) => { event.preventDefault(); handleDelete(); }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={statusItem !== null && statusValue !== null}
                onOpenChange={(open) => { if (!open) { setStatusItem(null); setStatusValue(null); } }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {statusValue ? "Activate Method?" : "Deactivate Method?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to{" "}
                            {statusValue ? "activate" : "deactivate"}{" "}
                            <span className="font-semibold text-foreground">
                                {statusItem?.name}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={statusMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={statusMutation.isPending} onClick={handleStatus}>
                            {statusMutation.isPending ? "Updating..." : statusValue ? "Activate" : "Deactivate"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
