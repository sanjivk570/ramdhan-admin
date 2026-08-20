import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { attributeService } from "../services/attribute.service";
import type {
  CreateAttributePayload,
  CreateAttributeValuePayload,
  UpdateAttributePayload,
} from "../types/attribute";
const key = (qc: any) =>
  qc.invalidateQueries({ queryKey: [QUERY_KEYS.ATTRIBUTES] });
export const useCreateAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: CreateAttributePayload) => attributeService.create(d),
    onSuccess: () => key(qc),
  });
};
export const useUpdateAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      uuid,
      data,
    }: {
      uuid: string;
      data: UpdateAttributePayload;
    }) => attributeService.update(uuid, data),
    onSuccess: (_, v) => {
      key(qc);
      qc.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTRIBUTES, "details", v.uuid],
      });
    },
  });
};
export const useDeleteAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => attributeService.delete(uuid),
    onSuccess: () => key(qc),
  });
};
export const useUpdateAttributeStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, status }: { uuid: string; status: boolean }) =>
      attributeService.update(uuid, { is_active: status }),
    onSuccess: () => key(qc),
  });
};
export const useRestoreAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => attributeService.restore(uuid),
    onSuccess: () => key(qc),
  });
};
export const useCreateAttributeValue = (uuid: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: CreateAttributeValuePayload) =>
      attributeService.createValue(uuid, d),
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTRIBUTES, "details", uuid],
      }),
  });
};
export const useDeleteAttributeValue = (uuid: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (valueUuid: string) =>
      attributeService.deleteValue(uuid, valueUuid),
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTRIBUTES, "details", uuid],
      }),
  });
};
export const useRestoreAttributeValue = (uuid: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (valueUuid: string) =>
      attributeService.restoreValue(uuid, valueUuid),
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTRIBUTES, "details", uuid],
      }),
  });
};
