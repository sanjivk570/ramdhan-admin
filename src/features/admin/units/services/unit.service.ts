import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
  Unit,
  UnitListParams,
  CreateUnitPayload,
  UpdateUnitPayload,
} from "../types/unit";

import type { PaginatedResponse, ApiResponse } from "@/types/api";

export const unitService = {
  list(params: UnitListParams) {
    return axiosClient.get<PaginatedResponse<Unit>>(ENDPOINTS.units.list, {
      params,
    });
  },

  details(uuid: string) {
    return axiosClient.get<ApiResponse<Unit>>(ENDPOINTS.units.details(uuid));
  },

  create(data: CreateUnitPayload) {
    return axiosClient.post(ENDPOINTS.units.create, data);
  },

  update(uuid: string, data: UpdateUnitPayload) {
    return axiosClient.put(ENDPOINTS.units.update(uuid), data);
  },

  delete(uuid: string) {
    return axiosClient.delete(ENDPOINTS.units.delete(uuid));
  },

  restore(uuid: string) {
    return axiosClient.patch(ENDPOINTS.units.restore(uuid));
  },

  updateStatus(uuid: string, status: boolean) {
    return axiosClient.patch(ENDPOINTS.units.status(uuid), {
      status,
    });
  },
};
