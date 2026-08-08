import { useQuery } from "@tanstack/react-query";

import { categoryService } from "../services/category.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useCategory(uuid?: string) {

    return useQuery({

        queryKey: [
            QUERY_KEYS.CATEGORIES,
            "details",
            uuid,
        ],

        queryFn: async () => {

            if (!uuid) {
                throw new Error(
                    "Category ID is required"
                );
            }

            const response =
                await categoryService.details(uuid);

            return response.data.data;
        },

        enabled: Boolean(uuid),

    });
}