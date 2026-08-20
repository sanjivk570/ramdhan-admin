import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxRateService } from "../services/tax-rate.service";

export function useTaxRate(uuid?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.TAX_RATES, "details", uuid],

        queryFn: async () => {
            if (!uuid) {
                throw new Error("Tax rate UUID is required");
            }

            const response = await taxRateService.details(uuid);

            return response.data.data;
        },

        enabled: Boolean(uuid),
    });
}
