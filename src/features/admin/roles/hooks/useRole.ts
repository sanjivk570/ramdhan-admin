import { useQuery } from "@tanstack/react-query";

import { roleService } from "../services/role.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useRole(id: number) {

    return useQuery({

        queryKey: [
            QUERY_KEYS.ROLES,
            "detail",
            id,
        ],

        queryFn: async () => {

            const response =
                await roleService.details(id);

            return response.data.data;

        },

        enabled: Boolean(id),

    });

}