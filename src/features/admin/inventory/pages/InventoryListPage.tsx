import { useNavigate } from "react-router-dom";

import { DataTable, useDataTable } from "@/components/data-table";

import { inventoryTableConfig } from "../config/inventory-table-config";

import { useInventoryList } from "../hooks/useInventoryList";

import { ROUTES } from "@/app/router/route-paths";

export default function InventoryListPage() {
  const navigate = useNavigate();

  const table = useDataTable({
    storageKey: "inventory",
  });

  const { data, isLoading } = useInventoryList(table.query as any);

  const meta = data?.meta
    ? {
        ...data.meta,

        from:
          data.meta.total === 0
            ? 0
            : (data.meta.current_page - 1) * data.meta.per_page + 1,

        to: Math.min(
          data.meta.current_page * data.meta.per_page,

          data.meta.total
        ),
      }
    : undefined;

  return (
    <DataTable
      config={inventoryTableConfig({
        onView: (inventory) => {
          navigate(`${ROUTES.INVENTORY}/${inventory.uuid}`);
        },
      })}
      table={table as any}
      rows={data?.data ?? []}
      meta={meta}
      loading={isLoading}
      emptyState={{
        title: "No inventory found",

        description: "No inventory records are available.",
      }}
    />
  );
}
