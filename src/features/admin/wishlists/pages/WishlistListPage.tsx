import { DataTable, useDataTable } from "@/components/data-table";
import { notification } from "@/lib/notification";

import { useWishlists } from "../hooks/useWishlists";
import { wishlistTableConfig } from "../config/wishlist-table-config";

export default function WishlistListPage() {
    const table = useDataTable({ storageKey: "wishlists" });

    const { data, isLoading } = useWishlists(table.query as any);

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

    const config = wishlistTableConfig({
        onView: (wishlist) => {
            notification.info(
                "Wishlist selected",
                `Customer: ${wishlist.customer_name || "Unknown"}\n` +
                    `Items: ${wishlist.items?.length ?? 0}`
            );
        },
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Wishlists
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review customer wishlists.
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
