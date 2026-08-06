import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/user.service";

import { QUERY_KEYS } from "@/constants/query-keys";

interface UpdateUserStatusPayload {
    uuid: string;
    status: boolean;
}

export function useUpdateUserStatus() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            uuid,
            status,
        }: UpdateUserStatusPayload) =>
            userService.updateStatus(
                uuid,
                status
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.USERS,
                ],
            });

        },

    });
}
