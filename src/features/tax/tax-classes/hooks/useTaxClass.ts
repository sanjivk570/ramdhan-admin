import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxClassService } from "../services/tax-class.service";

export function useTaxClass(uuid?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.TAX_CLASSES, "details", uuid],

        queryFn: async () => {
            if (!uuid) {
                throw new Error("Tax class UUID is required");
            }

            const response = await taxClassService.details(uuid);

            return response.data.data;
        },

        enabled: Boolean(uuid),
    });
}
