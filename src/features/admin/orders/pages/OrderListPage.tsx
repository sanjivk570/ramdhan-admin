import { useNavigate } from "react-router-dom";

import {
    DataTable,
    useDataTable,
} from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";

import { useOrders } from "../hooks/useOrders";
import { orderTableConfig } from "../config/order-table-config";
import type { Order } from "../types/order";

export default function OrderListPage() {
    const navigate = useNavigate();

    const table = useDataTable({
        storageKey: "orders",
    });

    const { data, isLoading } = useOrders(
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

    const config = orderTableConfig({
        onView: (order: Order) =>
            navigate(`${ROUTES.ORDERS}/${order.uuid}`),
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Orders
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage customer orders and their status.
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
