import { mediaService } from "@/features/media";
import type { UploadMediaPayload } from "@/features/media";

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
