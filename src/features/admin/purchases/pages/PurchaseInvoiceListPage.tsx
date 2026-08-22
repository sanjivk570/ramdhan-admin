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

import type { PurchaseInvoice } from "../types/purchase";
import { usePurchaseInvoices } from "../hooks/usePurchaseQueries";
import { usePostPurchaseInvoice } from "../hooks/usePurchaseMutations";
import { purchaseInvoiceTableConfig } from "../config/purchase-table-configs";
import { useState } from "react";

export default function PurchaseInvoiceListPage() {
    const table = useDataTable({
        storageKey: "purchase-invoices",
    });

    const { data, isLoading } = usePurchaseInvoices(
        table.query as any
    );

    const postMutation = usePostPurchaseInvoice();
    const [postItem, setPostItem] =
        useState<PurchaseInvoice | null>(null);

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

    const config = purchaseInvoiceTableConfig({
        onPost: (invoice) => setPostItem(invoice),
    });

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Purchase Invoices
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage supplier invoices and post them to
                        accounts payable.
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
                open={postItem !== null}
                onOpenChange={(open) => {
                    if (!open) setPostItem(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Post Purchase Invoice?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Posting invoice{" "}
                            <span className="font-semibold text-foreground">
                                {postItem?.supplier_invoice_number ||
                                    postItem?.uuid}
                            </span>{" "}
                            will record it in accounts payable.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={postMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={postMutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                if (!postItem) return;
                                postMutation.mutate(postItem.uuid, {
                                    onSuccess: () => {
                                        setPostItem(null);
                                        notification.success(
                                            "Invoice posted.",
                                            "The invoice has been recorded."
                                        );
                                    },
                                    onError: () => {
                                        notification.error(
                                            "Unable to post invoice.",
                                            "Please try again."
                                        );
                                    },
                                });
                            }}
                        >
                            {postMutation.isPending
                                ? "Posting..."
                                : "Post"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
