// import { useQuery } from "@tanstack/react-query";

// import { QUERY_KEYS } from "@/constants/query-keys";

// import { userService } from "../services/user.service";

// export function useUsers() {
//     return useQuery({
//         queryKey: QUERY_KEYS.USERS,

//         queryFn: async () => {
//             const response = await userService.getAll();

//             return response.data;
//         },
//     });
// }

import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import type { UserListParams } from "../types/user";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useUsers(params: UserListParams) {
    return useQuery({
        // queryKey: ["users", params],
        //queryKey: ["users", params],
        queryKey: [QUERY_KEYS.USERS, params],

        queryFn: async () => {
            const response = await userService.list(params);

            return response.data;
        },

        placeholderData: (previousData) => previousData,
    });
}