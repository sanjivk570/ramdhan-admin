import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { unitService } from "../services/unit.service";

interface UpdateUnitStatusVariables {
  uuid: string;

  status: boolean;
}

export function useUpdateUnitStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, status }: UpdateUnitStatusVariables) =>
      unitService.updateStatus(uuid, status),

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
