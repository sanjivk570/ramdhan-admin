import { useMutation, useQueryClient } from "@tanstack/react-query";

import { returnService } from "../services/return.service";
import type { ProcessReturnPayload } from "../types/return";

import { QUERY_KEYS } from "@/constants/query-keys";

interface Payload {
    uuid: string;
    data: ProcessReturnPayload;
}

export function useProcessReturn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: Payload) =>
            returnService.process(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.RETURNS],
            });
        },
    });
}
