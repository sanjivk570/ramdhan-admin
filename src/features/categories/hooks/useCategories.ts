import {
    useQuery,
} from "@tanstack/react-query";

import {
    categoryService,
} from "../services/category.service";

import type {
    CategoryListParams,
} from "../types/category";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";

export function useCategories(
    params: CategoryListParams
) {
    return useQuery({
        queryKey: [
            QUERY_KEYS.CATEGORIES,
            params,
        ],

        queryFn: async () => {

            const response =
                await categoryService.list(
                    params
                );

            return response.data;
        },

        placeholderData: (
            previousData
        ) => previousData,
    });
}