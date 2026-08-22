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

import type { GoodsReceipt } from "../types/purchase";
import { useGoodsReceipts } from "../hooks/usePurchaseQueries";
import {
    usePostGoodsReceipt,
    useVoidGoodsReceipt,
} from "../hooks/usePurchaseMutations";
import { goodsReceiptTableConfig } from "../config/purchase-table-configs";

export default function GoodsReceiptListPage() {
    const table = useDataTable({
        storageKey: "goods-receipts",
    });

    const { data, isLoading } = useGoodsReceipts(
        table.query as any
    );

    const postMutation = usePostGoodsReceipt();
    const voidMutation = useVoidGoodsReceipt();

    const [postItem, setPostItem] =
        useState<GoodsReceipt | null>(null);
    const [voidItem, setVoidItem] =
        useState<GoodsReceipt | null>(null);

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

    const config = goodsReceiptTableConfig({
        onPost: (receipt) => setPostItem(receipt),
        onVoid: (receipt) => setVoidItem(receipt),
    });

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Goods Receipts
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Post stock receipts and manage GRNs.
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

            {/* Post confirmation */}
            <AlertDialog
                open={postItem !== null}
                onOpenChange={(open) => {
                    if (!open) setPostItem(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Post Goods Receipt?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Posting{" "}
                            <span className="font-semibold text-foreground">
                                {postItem?.grn_number ||
                                    postItem?.uuid}
                            </span>{" "}
                            will add the items into stock.
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
                                            "Goods receipt posted.",
                                            "Stock has been updated."
                                        );
                                    },
                                    onError: () => {
                                        notification.error(
                                            "Unable to post goods receipt.",
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

            {/* Void confirmation */}
            <AlertDialog
                open={voidItem !== null}
                onOpenChange={(open) => {
                    if (!open) setVoidItem(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Void Goods Receipt?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Voiding{" "}
                            <span className="font-semibold text-foreground">
                                {voidItem?.grn_number ||
                                    voidItem?.uuid}
                            </span>{" "}
                            will reverse its stock impact.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={voidMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={voidMutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                if (!voidItem) return;
                                voidMutation.mutate(voidItem.uuid, {
                                    onSuccess: () => {
                                        setVoidItem(null);
                                        notification.success(
                                            "Goods receipt voided.",
                                            "The stock impact has been reversed."
                                        );
                                    },
                                    onError: () => {
                                        notification.error(
                                            "Unable to void goods receipt.",
                                            "Please try again."
                                        );
                                    },
                                });
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {voidMutation.isPending
                                ? "Voiding..."
                                : "Void"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

