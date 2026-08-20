import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/user.service";

import type {
    UpdateUserPayload,
} from "../types/user";

import { QUERY_KEYS } from "@/constants/query-keys";

interface UpdateUserVariables {
    uuid: string;
    data: UpdateUserPayload;
}

export function useUpdateUser() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            uuid,
            data,
        }: UpdateUserVariables) =>
            userService.update(
                uuid,
                data
            ),

        onSuccess: (
            _response,
            variables
        ) => {

            // Refresh users grid
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.USERS,
                ],
            });

            // Refresh particular user
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.USERS,
                    "details",
                    variables.uuid,
                ],
            });
        },

    });
}