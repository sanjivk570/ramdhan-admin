import type {
    DataTableConfig,
} from "@/components/data-table";

import {
    getWishlistColumns,
    type WishlistColumnActions,
} from "../columns/wishlist-columns";
import { wishlistFilters } from "./filters";
import type { Wishlist } from "../types/wishlist";

export function wishlistTableConfig(
    actions: WishlistColumnActions
): DataTableConfig<Wishlist> {
    return {
        title: "Wishlists",
        storageKey: "wishlists",
        searchPlaceholder: "Search wishlists by customer...",
        columns: getWishlistColumns(actions),
        filters: wishlistFilters,
    };
}
