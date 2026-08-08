import {
    getCategoryColumns,
    type CategoryColumnActions,
} from "../columns/category-columns";

import { categoryFilters } from "./filters";

import { categoryExportColumns } from "./category-export-columns";

import type {
    DataTableConfig,
    ExportColumn,
} from "../../../components/data-table";

import type { Category } from "../types/category";

export function categoryTableConfig(
    actions: CategoryColumnActions
): DataTableConfig<Category>{

    return {

        title: "Categories",

        storageKey: "categories",

        searchPlaceholder:
            "Search categories...",

        columns:
            getCategoryColumns(actions),

        filters:
            categoryFilters,

        exportColumns:
            categoryExportColumns as unknown as ExportColumn<Category>[],

    };
}