import { DataTable, useDataTable } from "@/components/data-table";

import { usePurchasePayments } from "../hooks/usePurchaseQueries";
import { purchasePaymentTableConfig } from "../config/purchase-table-configs";

export default function PurchasePaymentListPage() {
    const table = useDataTable({
        storageKey: "purchase-payments",
    });

    const { data, isLoading } = usePurchasePayments(
        table.query as any
    );

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

    const config = purchasePaymentTableConfig();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Purchase Payments
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Track supplier payments.
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
    );
}
