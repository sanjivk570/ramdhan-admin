import { useQuery } from "@tanstack/react-query";

import { permissionService } from "../services/permission.service";

export function usePermissions() {

    return useQuery({

        queryKey: [
            "permissions",
        ],

        queryFn: async () => {

            const response =
                await permissionService.list();

            return response.data.data;

        },

        staleTime:
            5 * 60 * 1000,

    });

}