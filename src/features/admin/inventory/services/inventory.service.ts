import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
  InventoryStock,
  InventoryListParams,
  InventoryTransaction,
  InventoryTransactionParams,
  StockInPayload,
  StockOutPayload,
  InventoryAdjustmentPayload,
} from "../types/inventory";

import type { PaginatedResponse, ApiResponse } from "@/types/api";

export const inventoryService = {
  list(params: InventoryListParams) {
    return axiosClient.get<PaginatedResponse<InventoryStock>>(
      ENDPOINTS.inventory.list,
      {
        params,
      }
    );
  },

  details(uuid: string) {
    return axiosClient.get<ApiResponse<InventoryStock>>(
      ENDPOINTS.inventory.details(uuid)
    );
  },

  stockIn(uuid: string, data: StockInPayload) {
    return axiosClient.post(ENDPOINTS.inventory.stockIn(uuid), data);
  },

  stockOut(uuid: string, data: StockOutPayload) {
    return axiosClient.post(ENDPOINTS.inventory.stockOut(uuid), data);
  },

  adjustment(uuid: string, data: InventoryAdjustmentPayload) {
    return axiosClient.post(ENDPOINTS.inventory.adjustment(uuid), data);
  },

  transactions(uuid: string, params: InventoryTransactionParams) {
    return axiosClient.get<PaginatedResponse<InventoryTransaction>>(
      ENDPOINTS.inventory.transactions(uuid),
      {
        params,
      }
    );
  },
};
