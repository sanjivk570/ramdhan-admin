import { useMutation, useQueryClient } from "@tanstack/react-query";

import { roleService } from "../services/role.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteRole() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            id: number
        ) =>
            roleService.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.ROLES,
                ],
            });

        },

    });
}
