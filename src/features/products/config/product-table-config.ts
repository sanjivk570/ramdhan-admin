import type { DataTableConfig, ExportColumn } from "@/components/data-table";
import type { CsvColumn } from "@/lib/csv";
import type { Product } from "../types/product";
import { getProductColumns, type ProductColumnActions } from "../columns/product-columns";
import { productFilters } from "./filters";

const exportColumns: CsvColumn<Product>[] = [
    { key: "name", title: "Product" },
    { key: "sku", title: "SKU" },
    { key: "price", title: "Price" },
    { key: "stock_quantity", title: "Stock" },
    { key: "is_active", title: "Status" },
];

export function productTableConfig(
    actions: ProductColumnActions
): DataTableConfig<Product> {
    return {
        title: "Products",
        storageKey: "products",
        searchPlaceholder: "Search products by name or SKU...",
        columns: getProductColumns(actions),
        filters: productFilters,
        exportColumns: exportColumns as unknown as ExportColumn<Product>[],
    };
}
