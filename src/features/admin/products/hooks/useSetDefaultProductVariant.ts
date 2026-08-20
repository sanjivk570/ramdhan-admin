import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";

export function useSetDefaultProductVariant(productUuid: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variantUuid: string) =>
            productService.setDefaultVariant(productUuid, variantUuid),
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
