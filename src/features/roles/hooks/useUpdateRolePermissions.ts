import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { roleService } from "../services/role.service";
import { notification } from "@/lib/notification";

export function useUpdateRolePermissions(
    id: number
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (permissions: string[]) =>
            roleService.updatePermissions(
                id,
                permissions
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "role-permissions",
                    id,
                ],
            });

            notification.success(
                "Permissions updated successfully.",
                "The role permissions have been updated."
            );
        },

        onError: () => {
            notification.error(
                "Unable to update permissions.",
                "Please try again."
            );
        },
    });
}