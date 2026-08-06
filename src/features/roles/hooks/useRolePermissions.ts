import { useQuery } from "@tanstack/react-query";

import { roleService } from "../services/role.service";

export function useRolePermissions(
    id: number
) {

    return useQuery({

        queryKey: [
            "role-permissions",
            id,
        ],

        queryFn: async () => {

            const response =
                await roleService.permissions(id);

            return response.data;

        },

        enabled: Boolean(id),

    });

}