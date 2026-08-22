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
import type { ShippingZone } from "../types/shipping";
import { useShippingZones } from "../hooks/useShippingQueries";
import { useDeleteZone, useZoneStatus } from "../hooks/useShippingMutations";
import { shippingZoneTableConfig } from "../config/shipping-zone-table-config";

export default function ShippingZoneListPage() {
    const table = useDataTable({ storageKey: "shipping-zones" });
    const { data, isLoading } = useShippingZones(table.query as any);
    const deleteMutation = useDeleteZone();
    const statusMutation = useZoneStatus();

    const [deleteItem, setDeleteItem] = useState<ShippingZone | null>(null);
    const [statusItem, setStatusItem] = useState<ShippingZone | null>(null);
    const [statusValue, setStatusValue] = useState<boolean | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from: (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(data.meta.current_page * data.meta.per_page, data.meta.total),
          }
        : undefined;

    const config = shippingZoneTableConfig({
        onView: () => {},
        onEdit: () => {},
        onDelete: (zone) => setDeleteItem(zone),
        onActivate: (zone) => { setStatusItem(zone); setStatusValue(true); },
        onDeactivate: (zone) => { setStatusItem(zone); setStatusValue(false); },
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => { setDeleteItem(null); notification.success("Zone deleted."); },
            onError: () => notification.error("Unable to delete zone."),
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
                    notification.success(statusValue ? "Zone activated." : "Zone deactivated.");
                },
                onError: () => notification.error("Unable to update zone status."),
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Shipping Zones
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage shipping zones for order fulfillment.
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
                        <AlertDialogTitle>Delete Zone?</AlertDialogTitle>
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
                            {statusValue ? "Activate Zone?" : "Deactivate Zone?"}
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