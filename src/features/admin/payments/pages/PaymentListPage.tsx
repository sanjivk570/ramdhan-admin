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

import type { PaymentTransaction } from "../types/payment";
import { usePayments } from "../hooks/usePayments";
import { useRefund } from "../hooks/useRefund";
import { paymentTableConfig } from "../config/payment-table-config";

export default function PaymentListPage() {
    const table = useDataTable({ storageKey: "payments" });

    const { data, isLoading } = usePayments(table.query as any);
    const refundMutation = useRefund();
    const [refundItem, setRefundItem] = useState<PaymentTransaction | null>(null);

    const meta = data?.meta
        ? {
              ...data.meta,
              from:
                  (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
              ),
          }
        : undefined;

    const config = paymentTableConfig({
        onRefund: (payment) => setRefundItem(payment),
    });

    const handleRefund = () => {
        if (!refundItem) {
            return;
        }
        refundMutation.mutate(
            {
                orderUuid: refundItem.order_uuid || "",
                data: {},
            },
            {
                onSuccess: () => {
                    setRefundItem(null);
                    notification.success(
                        "Refund initiated successfully.",
                        "The refund has been processed."
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to process refund.",
                        "Please try again."
                    );
                },
            }
        );
    };

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Payments
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        View payment transactions and process refunds.
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
                open={refundItem !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setRefundItem(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Process Refund?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to refund payment{" "}
                            <span className="font-semibold text-foreground">
                                {refundItem?.transaction_id}
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={refundMutation.isPending}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={refundMutation.isPending}
                            onClick={(event) => {
                                event.preventDefault();
                                handleRefund();
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {refundMutation.isPending ? "Refunding..." : "Refund"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
