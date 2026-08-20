import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";
import type { ProductVariantPayload } from "../types/product";

export function useCreateProductVariant(productUuid: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProductVariantPayload) =>
            productService.createVariant(productUuid, data),
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
