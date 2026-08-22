import type { CsvColumn } from "@/lib/csv";

import type { Wishlist } from "../types/wishlist";

export const wishlistExportColumns: CsvColumn<Wishlist>[] = [
    {
        key: "uuid",
        title: "Wishlist",
    },
    {
        key: "customer_name",
        title: "Customer",
    },
    {
        key: "items",
        title: "Items",
        value: (row) => String(row.items?.length ?? 0),
    },
    {
        key: "created_at",
        title: "Created",
    },
];
