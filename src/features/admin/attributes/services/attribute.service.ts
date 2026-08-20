import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type {
  Attribute,
  AttributeListParams,
  AttributeValue,
  CreateAttributePayload,
  CreateAttributeValuePayload,
  UpdateAttributePayload,
} from "../types/attribute";
export const attributeService = {
  list: (params: AttributeListParams) =>
    axiosClient.get<PaginatedResponse<Attribute>>(ENDPOINTS.attributes.list, {
      params,
    }),
  details: (uuid: string) =>
    axiosClient.get<ApiResponse<Attribute>>(ENDPOINTS.attributes.details(uuid)),
  create: (data: CreateAttributePayload) =>
    axiosClient.post<ApiResponse<Attribute>>(ENDPOINTS.attributes.create, data),
  update: (uuid: string, data: UpdateAttributePayload) =>
    axiosClient.put<ApiResponse<Attribute>>(
      ENDPOINTS.attributes.update(uuid),
      data
    ),
  delete: (uuid: string) =>
    axiosClient.delete(ENDPOINTS.attributes.delete(uuid)),
  restore: (uuid: string) =>
    axiosClient.post(ENDPOINTS.attributes.restore(uuid)),
  createValue: (uuid: string, data: CreateAttributeValuePayload) =>
    axiosClient.post<ApiResponse<AttributeValue>>(
      ENDPOINTS.attributes.values.create(uuid),
      data
    ),
  valueDetails: (uuid: string, valueUuid: string) =>
    axiosClient.get<ApiResponse<AttributeValue>>(
      ENDPOINTS.attributes.values.details(uuid, valueUuid)
    ),
  deleteValue: (uuid: string, valueUuid: string) =>
    axiosClient.delete(ENDPOINTS.attributes.values.delete(uuid, valueUuid)),
  restoreValue: (uuid: string, valueUuid: string) =>
    axiosClient.post(ENDPOINTS.attributes.values.restore(uuid, valueUuid)),
};
