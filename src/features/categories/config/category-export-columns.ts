import type { CsvColumn } from "@/lib/csv";

import type { Category } from "../types/category";

export const categoryExportColumns: CsvColumn<Category>[] = [
    {
        key: "name",
        title: "Name",
    },
    {
        key: "slug",
        title: "Slug",
    },
    {
        key: "parent",
        title: "Parent Category",
        value: (category: Category) =>
            category.parent?.name ?? "",
    },
    {
        key: "is_active",
        title: "Status",
        value: (category: Category) =>
            category.is_active
                ? "Active"
                : "Inactive",
    },
    {
        key: "sort_order",
        title: "Sort Order",
    },
    {
        key: "created_at",
        title: "Created",
    },
];