import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { categoryService } from "../services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteCategory() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            uuid: string
        ) =>
            categoryService.delete(
                uuid
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