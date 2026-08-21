import { useNavigate } from "react-router-dom";

import {
    DataTable,
    useDataTable,
} from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";

import { useReturns } from "../hooks/useReturns";
import { returnTableConfig } from "../config/return-table-config";
import type { ReturnRequest } from "../types/return";

export default function ReturnListPage() {
    const navigate = useNavigate();

    const table = useDataTable({
        storageKey: "returns",
    });

    const { data, isLoading } = useReturns(table.query as any);

    const meta = data?.meta
        ? {
              ...data.meta,
              from:
                  (data.meta.current_page - 1) *
                      data.meta.per_page +
                  1,
              to: Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
              ),
          }
        : undefined;

    const config = returnTableConfig({
        onView: (item: ReturnRequest) =>
            navigate(`${ROUTES.RETURNS}/${item.uuid}`),
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Returns
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review and process customer return requests.
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
