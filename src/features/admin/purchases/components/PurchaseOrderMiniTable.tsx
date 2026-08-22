import type { ColumnDef } from "@tanstack/react-table";

import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/orders/columns/order-columns";

import type { PurchaseOrder } from "@/features/admin/purchases/types/purchase";

export function PurchaseOrderMiniTable({
    orders,
    onView,
}: {
    orders: PurchaseOrder[];
    onView: (order: PurchaseOrder) => void;
}) {
    if (orders.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                No purchase orders.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="border-b bg-muted/20 text-left">
                        <th className="px-4 py-2 font-medium">
                            PO #
                        </th>
                        <th className="px-4 py-2 font-medium">
                            Status
                        </th>
                        <th className="px-4 py-2 font-medium text-right">
                            Total
                        </th>
                        <th className="px-4 py-2 font-medium">
                            Date
                        </th>
                        <th className="px-4 py-2 font-medium text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((po) => (
                        <tr
                            key={po.uuid}
                            className="border-b last:border-0"
                        >
                            <td className="px-4 py-2 font-mono text-xs">
                                {po.po_number || po.uuid.slice(0, 8)}
                            </td>
                            <td className="px-4 py-2 capitalize">
                                {po.status}
                            </td>
                            <td className="px-4 py-2 text-right">
                                {formatMoney(
                                    po.grand_total ?? 0,
                                    po.currency_code ?? "INR"
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {formatDateTime(po.created_at)}
                            </td>
                            <td className="px-4 py-2 text-center">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onView(po)}
                                >
                                    View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
