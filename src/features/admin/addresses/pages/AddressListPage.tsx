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

import type { Address } from "../types/address";
import { useAddresses } from "../hooks/useAddressQueries";
import {
    useDeleteAddress,
    useSetDefaultAddress,
} from "../hooks/useAddressMutations";
import { addressTableConfig } from "../config/address-table-config";

export default function AddressListPage() {
    const table = useDataTable({ storageKey: "addresses" });
    const navigate = useNavigate();

    const { data, isLoading } = useAddresses(table.query as any);

    const deleteMutation = useDeleteAddress();
    const setDefaultMutation = useSetDefaultAddress();

    const [deleteItem, setDeleteItem] = useState<Address | null>(null);
    const [defaultItem, setDefaultItem] = useState<Address | null>(null);

    const rows = data?.data ?? [];

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

    const config = addressTableConfig({
        onEdit: (address) =>
            navigate(`${ROUTES.ADDRESSES}/${address.uuid}/edit`),
        onDelete: (address) => setDeleteItem(address),
        onSetDefault: (address) => setDefaultItem(address),
    });

    const handleDelete = () => {
        if (!deleteItem) return;
        deleteMutation.mutate(deleteItem.uuid, {
            onSuccess: () => {
                setDeleteItem(null);
                notification.success("Address deleted successfully.");
            },
            onError: () => notification.error("Unable to delete address."),
        });
    };

        const handleSetDefault = () => {
        if (!defaultItem) return;
        setDefaultMutation.mutate(defaultItem.uuid, {
            onSuccess: () => {
                setDefaultItem(null);
                notification.success("Default address updated.");
            },
            onError: () => notification.error("Unable to set default address."),
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Addresses
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage customer and supplier addresses.
                    </p>
                </div>

                <DataTable
                    config={config}
                    table={table as any}
                    rows={rows}
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
                        <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this address?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>
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
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={defaultItem !== null}
                onOpenChange={(open) => {
                    if (!open) setDefaultItem(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Set as Default?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Mark this address as the default?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={setDefaultMutation.isPending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={setDefaultMutation.isPending}
                            onClick={handleSetDefault}
                        >
                            {setDefaultMutation.isPending ? "Setting..." : "Set Default"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}