import { useNavigate } from "react-router-dom";

import { DataTable, useDataTable } from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";

import { useCarts } from "../hooks/useCarts";
import { cartTableConfig } from "../config/cart-table-config";

export default function CartListPage() {
    const navigate = useNavigate();
    const table = useDataTable({ storageKey: "carts" });

    const { data, isLoading } = useCarts(table.query as any);

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

    const config = cartTableConfig({
        onView: (cart) => navigate(`${ROUTES.CARTS}/${cart.uuid}`),
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Carts
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review customer shopping carts.
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
