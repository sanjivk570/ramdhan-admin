import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
    MediaItem,
    MediaTarget,
    UpdateMediaPayload,
    UploadMediaPayload,
} from "../types/media";

export const mediaService = {
    upload(target: MediaTarget, payload: UploadMediaPayload) {
        const formData = new FormData();

        formData.append("file", payload.file);
        formData.append("mediable_type", target.mediableType);
        formData.append("mediable_uuid", target.mediableUuid);
        formData.append("collection", target.collection);
        formData.append("is_primary", payload.is_primary ? "1" : "0");

        if (payload.title) {
            formData.append("title", payload.title);
        }

        if (payload.alt_text) {
            formData.append("alt_text", payload.alt_text);
        }

        if (payload.description) {
            formData.append("description", payload.description);
        }

        if (payload.sort_order !== undefined) {
            formData.append("sort_order", String(payload.sort_order));
        }

        return axiosClient.post<ApiResponse<MediaItem>>(
            ENDPOINTS.media.create,
            formData
        );
    },

    update(uuid: string, payload: UpdateMediaPayload) {
        return axiosClient.put<ApiResponse<MediaItem>>(
            ENDPOINTS.media.update(uuid),
            payload
        );
    },

    delete(uuid: string) {
        return axiosClient.delete<ApiResponse<unknown>>(
            ENDPOINTS.media.delete(uuid)
        );
    },

    restore(uuid: string) {
        return axiosClient.post<ApiResponse<MediaItem>>(
            ENDPOINTS.media.restore(uuid)
        );
    },

    forceDelete(uuid: string) {
        return axiosClient.delete<ApiResponse<unknown>>(
            ENDPOINTS.media.forceDelete(uuid)
        );
    },

    setPrimary(uuid: string) {
        return axiosClient.patch<ApiResponse<MediaItem>>(
            ENDPOINTS.media.primary(uuid)
        );
    },
};
