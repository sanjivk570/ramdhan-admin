import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { unitService } from "../services/unit.service";

export function useUnit(uuid?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.UNITS, "details", uuid],

    queryFn: async () => {
      if (!uuid) {
        throw new Error("Unit UUID is required");
      }

      const response = await unitService.details(uuid);

      return response.data.data;
    },

    enabled: Boolean(uuid),
  });
}
