import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { roleService } from "../services/role.service";

import type {
    UpdateRolePayload,
} from "../types/role";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useUpdateRole(
    id: number
) {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            data: UpdateRolePayload
        ) =>
            roleService.update(
                id,
                data
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.ROLES,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.ROLES,
                    "detail",
                    id,
                ],
            });

        },

    });

}