import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { categoryService } from "../services/category.service";

import type {
    UpdateCategoryPayload,
} from "../types/category";

import { QUERY_KEYS } from "@/constants/query-keys";

interface UpdateCategoryVariables {
    uuid: string;
    data: UpdateCategoryPayload;
}

export function useUpdateCategory() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            uuid,
            data,
        }: UpdateCategoryVariables) =>
            categoryService.update(
                uuid,
                data
            ),

        onSuccess: (
            _response,
            variables
        ) => {

            /*
             * Refresh categories grid
             */
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.CATEGORIES,
                ],
            });

            /*
             * Refresh particular category
             */
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.CATEGORIES,
                    "details",
                    variables.uuid,
                ],
            });

        },

    });
}
