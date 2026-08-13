import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { unitService } from "../services/unit.service";

import type { UnitListParams } from "../types/unit";

export function useUnits(params: UnitListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.UNITS, params],

    queryFn: async () => {
      const response = await unitService.list(params);

      return response.data;
    },

    placeholderData: (previousData) => previousData,

    staleTime: 30 * 1000,

    refetchOnWindowFocus: false,
  });
}
