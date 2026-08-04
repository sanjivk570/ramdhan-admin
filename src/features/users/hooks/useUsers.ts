// import { useQuery } from "@tanstack/react-query";

// import { userService } from "../services/user.service";
// import type { UserListParams } from "../types/user";

// import { QUERY_KEYS } from "@/constants/query-keys";

// export function useUsers(params: UserListParams) {
//     return useQuery({
//         // queryKey: ["users", params],
//         //queryKey: ["users", params],
//         queryKey: [QUERY_KEYS.USERS, params],

//         queryFn: async () => {
//             const response = await userService.list(params);

//             return response.data;
//         },

//         placeholderData: (previousData) => previousData,
//     });
// }

import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import type { UserListParams } from "../types/user";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useUsers(params: UserListParams) {
    return useQuery({
        queryKey: [
            QUERY_KEYS.USERS,
            params,
        ],

        queryFn: async () => {
            const response =
                await userService.list(params);

            return response.data;
        },

        placeholderData: (previousData) =>
            previousData,

        staleTime: 30 * 1000,

        refetchOnWindowFocus: false,
    });
}