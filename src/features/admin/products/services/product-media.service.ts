import { mediaService } from "@/features/admin/media";
import type { UploadMediaPayload } from "@/features/admin/media";

const target = (productUuid: string) => ({
    mediableType: "product",
    mediableUuid: productUuid,
    collection: "product",
} as const);

export const productMediaService = {
    upload(productUuid: string, payload: UploadMediaPayload) {
        return mediaService.upload(target(productUuid), payload);
    },
};
