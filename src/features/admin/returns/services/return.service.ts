import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    ReturnRequest,
    ReturnListParams,
    ProcessReturnPayload,
} from "../types/return";
import type {
    PaginatedResponse,
    ApiResponse,
} from "@/types/api";

export const returnService = {
    list(params: ReturnListParams) {
        return axiosClient.get<PaginatedResponse<ReturnRequest>>(
            ENDPOINTS.returns.list,
            { params }
        );
    },

    details(uuid: string) {
        return axiosClient.get<ApiResponse<ReturnRequest>>(
            ENDPOINTS.returns.details(uuid)
        );
    },

    process(uuid: string, payload: ProcessReturnPayload) {
        return axiosClient.patch(
            ENDPOINTS.returns.process(uuid),
            payload
        );
    },
};
