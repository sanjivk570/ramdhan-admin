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

import type { PurchaseReturn } from "../types/purchase";
import { usePurchaseReturns } from "../hooks/usePurchaseQueries";
import { usePostPurchaseReturn } from "../hooks/usePurchaseMutations";
import { purchaseReturnTableConfig } from "../config/purchase-table-configs";

export default function PurchaseReturnListPage() {
    const table = useDataTable({
        storageKey: "purchase-returns",
    });

    const { data, isLoading } = usePurchaseReturns(
        table.query as any
    );

    const postMutation = usePostPurchaseReturn();
    const [postItem, setPostItem] =
        useState<PurchaseReturn | null>(null);

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

    const config = purchaseReturnTableConfig({
        onPost: (purchaseReturn) => setPostItem(purchaseReturn),
    });

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Purchase Returns
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage supplier returns.
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
                            Post Purchase Return?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Posting return{" "}
                            <span className="font-semibold text-foreground">
                                {postItem?.return_number ||
                                    postItem?.uuid}
                            </span>{" "}
                            will record the stock going back to the
                            supplier.
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
                                            "Return posted.",
                                            "The purchase return has been recorded."
                                        );
                                    },
                                    onError: () => {
                                        notification.error(
                                            "Unable to post return.",
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
