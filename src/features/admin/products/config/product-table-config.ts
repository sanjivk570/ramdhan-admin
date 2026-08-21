import type { DataTableConfig, ExportColumn } from "@/components/data-table";
import type { Product } from "../types/product";
import { getProductColumns, type ProductColumnActions } from "../columns/product-columns";
import { productFilters } from "./filters";

const exportColumns: ExportColumn<Product>[] = [
    { key: "name", label: "Product" },
    { key: "sku", label: "SKU" },
    { key: "price", label: "Price" },
    { key: "stock_quantity", label: "Stock" },
    { key: "is_active", label: "Status" },
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
