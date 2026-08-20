import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/user.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            uuid: string
        ) =>
            userService.delete(uuid),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.USERS,
                ],
            });

        },

    });
}
