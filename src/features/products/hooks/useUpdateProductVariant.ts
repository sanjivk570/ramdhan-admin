import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";
import type { ProductVariantPayload } from "../types/product";

interface Variables {
    variantUuid: string;
    data: ProductVariantPayload;
}

export function useUpdateProductVariant(productUuid: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ variantUuid, data }: Variables) =>
            productService.updateVariant(productUuid, variantUuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCTS, "variants", productUuid],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCTS, "details", productUuid],
            });
        },
    });
}
