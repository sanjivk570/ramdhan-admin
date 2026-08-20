import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { taxClassService } from "../services/tax-class.service";
import type { TaxClassListParams } from "../types/tax-class";

export function useTaxClasses(params: TaxClassListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.TAX_CLASSES, params],

        queryFn: async () => {
            const response = await taxClassService.list(params);
            return response.data;
        },

        placeholderData: (previousData) => previousData,

        staleTime: 30 * 1000,

        refetchOnWindowFocus: false,
    });
}
