// import { useMutation } from "@tanstack/react-query";
// import type { AxiosError } from "axios";

// import { userService } from "../services/user.service";
// import type { CreateUserPayload } from "../types/user";

// export interface ApiValidationError {
//     message?: string;

//     errors?: Record<
//         string,
//         string[] | string
//     >;
// }

// export type CreateUserError =
//     AxiosError<ApiValidationError>;

// export function useCreateUser() {

//     return useMutation({
//         mutationFn: (
//             data: CreateUserPayload
//         ) =>
//             userService.create(data),
//     });

// }

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "../services/user.service";
import type { CreateUserPayload } from "../types/user";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateUser() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateUserPayload
        ) =>
            userService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.USERS,
                ],
            });
        },
    });
}