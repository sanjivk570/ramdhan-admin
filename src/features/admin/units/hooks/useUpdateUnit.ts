import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { unitService } from "../services/unit.service";

import type { UpdateUnitPayload } from "../types/unit";

interface UpdateUnitVariables {
  uuid: string;

  data: UpdateUnitPayload;
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, data }: UpdateUnitVariables) =>
      unitService.update(uuid, data),

    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UNITS],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.UNITS, "details", variables.uuid],
      });
    },
  });
}
