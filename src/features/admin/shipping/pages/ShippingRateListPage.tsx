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
import type { ShippingRate } from "../types/shipping";
import { useShippingRates } from "../hooks/useShippingQueries";
import { useDeleteRate } from "../hooks/useShippingMutations";
import { shippingRateTableConfig } from "../config/shipping-rate-table-config";

export default function ShippingRateListPage() {
    const table = useDataTable({ storageKey: "shipping-rates" });
    const { data, isLoading } = useShippingRates(table.query as any);
    const deleteMutation = useDeleteRate();

    const [deleteItem, setDeleteItem] = useState<ShippingRate | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from: (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(data.meta.current_page * data.meta.per_page, data.meta.total),
          }
        : undefined;

    const config = shippingRateTableConfig({
        onEdit: () => {},
        onDelete: (rate) => setDeleteItem(rate),
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => { setDeleteItem(null); notification.success("Rate deleted."); },
            onError: () => notification.error("Unable to delete rate."),
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Shipping Rates
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage shipping rate rules by zone and method.
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
                        <AlertDialogTitle>Delete Rate?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this shipping rate?
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
        </>
    );
}
