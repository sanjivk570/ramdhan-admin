import { useQuery } from "@tanstack/react-query";

import { returnService } from "../services/return.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useReturn(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.RETURNS, uuid],
        queryFn: async () => {
            if (!uuid) {
                return undefined;
            }
            const response = await returnService.details(uuid);
            return response.data.data;
        },
        enabled: Boolean(uuid),
    });
}
