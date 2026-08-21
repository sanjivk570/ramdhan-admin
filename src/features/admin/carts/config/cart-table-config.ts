import type {
    DataTableConfig,
} from "@/components/data-table";

import {
    getCartColumns,
    type CartColumnActions,
} from "../columns/cart-columns";
import { cartFilters } from "./filters";
import type { Cart } from "../types/cart";

export function cartTableConfig(
    actions: CartColumnActions
): DataTableConfig<Cart> {
    return {
        title: "Carts",
        storageKey: "carts",
        searchPlaceholder: "Search carts by customer...",
        columns: getCartColumns(actions),
        filters: cartFilters,
    };
}
