import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getOrderColumns,
    type OrderColumnActions,
} from "../columns/order-columns";
import { orderFilters } from "./filters";
import { orderExportColumns } from "./order-export-columns";
import type { Order } from "../types/order";

export function orderTableConfig(
    actions: OrderColumnActions
): DataTableConfig<Order> {
    return {
        title: "Orders",
        storageKey: "orders",
        searchPlaceholder: "Search orders by number, customer...",
        columns: getOrderColumns(actions),
        filters: orderFilters,
        exportColumns:
            orderExportColumns as unknown as ExportColumn<Order>[],
    };
}
