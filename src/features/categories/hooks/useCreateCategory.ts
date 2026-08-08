import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    categoryService,
} from "../services/category.service";

import type {
    CreateCategoryPayload,
} from "../types/category";

import {
    QUERY_KEYS,
} from "@/constants/query-keys";


export function useCreateCategory() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn: (
            data: CreateCategoryPayload
        ) =>
            categoryService.create(
                data
            ),


        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: [
                    QUERY_KEYS.CATEGORIES,
                ],

            });

        },

    });

}
