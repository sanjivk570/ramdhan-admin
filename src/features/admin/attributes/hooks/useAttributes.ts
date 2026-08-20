import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { attributeService } from "../services/attribute.service";
import type { AttributeListParams } from "../types/attribute";
export function useAttributes(params: AttributeListParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTRIBUTES, params],
    queryFn: async () => (await attributeService.list(params)).data,
    placeholderData: (p) => p,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}
