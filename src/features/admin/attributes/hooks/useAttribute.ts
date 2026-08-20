import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { attributeService } from "../services/attribute.service";
export function useAttribute(uuid?: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTRIBUTES, "details", uuid],
    queryFn: async () => {
      if (!uuid) throw new Error("Attribute UUID is required");
      return (await attributeService.details(uuid)).data.data;
    },
    enabled: !!uuid,
  });
}
