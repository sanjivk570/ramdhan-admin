// import { useQuery } from "@tanstack/react-query";

// import { QUERY_KEYS } from "@/constants/query-keys";

// import { roleService } from "../services/user.service";

// export function useRoles() {
//     return useQuery({
//         queryKey: QUERY_KEYS.USERS,

//         queryFn: async () => {
//             const response = await roleService.getAll();

//             return response.data;
//         },
//     });
// }

import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role.service.ts";
import type { RoleListParams } from "../types/./role.ts";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useRoles(params: RoleListParams) {
    return useQuery({
        // queryKey: ["users", params],
        //queryKey: ["users", params],
        queryKey: [QUERY_KEYS.ROLES, params],

        queryFn: async () => {
            const response = await roleService.list(params);

            return response.data;
        },

        placeholderData: (previousData) => previousData,
    });
}