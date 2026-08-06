import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useUser(uuid?: string) {

    return useQuery({
        queryKey: [
            QUERY_KEYS.USERS,
            "details",
            uuid,
        ],

        queryFn: async () => {

            if (!uuid) {
                throw new Error(
                    "User UUID is required"
                );
            }

            const response =
                await userService.details(uuid);

            // API response:
            // {
            //     success: true,
            //     data: {...}
            // }

            return response.data.data;
        },

        enabled: Boolean(uuid),
    });
}
