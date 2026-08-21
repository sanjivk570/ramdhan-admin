import type {
    DataTableConfig,
} from "@/components/data-table";

import {
    getOrderColumns,
    type OrderColumnActions,
} from "../columns/order-columns";
import { orderFilters } from "./filters";
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
    };
}
