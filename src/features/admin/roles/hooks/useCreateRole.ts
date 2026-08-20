import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { roleService } from "../services/role.service";

import type {
    CreateRolePayload,
} from "../types/role";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateRole() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            data: CreateRolePayload
        ) =>
            roleService.create(data),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.ROLES,
                ],
            });

        },

    });

}