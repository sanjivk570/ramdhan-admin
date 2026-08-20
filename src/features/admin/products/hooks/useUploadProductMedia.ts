import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productMediaService } from "../services/product-media.service";
import type { UploadMediaPayload } from "@/features/admin/media";

interface Variables {
    productUuid: string;
    payload: UploadMediaPayload;
}

export function useUploadProductMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productUuid, payload }: Variables) =>
            productMediaService.upload(productUuid, payload),
        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCTS, "details", variables.productUuid],
            });
        },
    });
}
