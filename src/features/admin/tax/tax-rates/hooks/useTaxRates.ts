import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxRateService } from "../services/tax-rate.service";
import type { TaxRateListParams } from "../types/tax-rate";

export function useTaxRates(params: TaxRateListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.TAX_RATES, params],

        queryFn: async () => {
            const response = await taxRateService.list(params);
            return response.data;
        },

        placeholderData: (previousData) => previousData,

        staleTime: 30 * 1000,

        refetchOnWindowFocus: false,
    });
}
