import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { categoryService } from "../services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export interface UpdateCategoryStatusPayload {
    uuid: string;
    status: boolean;
}

export function useUpdateCategoryStatus() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            data: UpdateCategoryStatusPayload
        ) =>
            categoryService.status(
                data.uuid,
                data.status
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