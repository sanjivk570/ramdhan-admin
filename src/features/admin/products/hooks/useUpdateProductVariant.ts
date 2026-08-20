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
        // onSuccess: () => {
        //     queryClient.invalidateQueries({
        //         queryKey: [QUERY_KEYS.PRODUCTS, "variants", productUuid],
        //     });
        //     queryClient.invalidateQueries({
        //         queryKey: [QUERY_KEYS.PRODUCTS, "details", productUuid],
        //     });
        // },

        onSuccess: async (
            _response,
            variables
        ) => {

            /*
             * -----------------------------------------
             * 1. Product variants list
             * -----------------------------------------
             */
            await queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.PRODUCTS,
                    "variants",
                    productUuid,
                ],
                refetchType: "all",
            });

            /*
             * -----------------------------------------
             * 2. Product details
             * -----------------------------------------
             */
            await queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.PRODUCTS,
                    "details",
                    productUuid,
                ],
                refetchType: "all",
            });

            /*
             * -----------------------------------------
             * 3. IMPORTANT:
             * Individual variant detail
             *
             * This was missing.
             * -----------------------------------------
             */
            await queryClient.invalidateQueries({
                queryKey: [
                    QUERY_KEYS.PRODUCTS,
                    "variant",
                    productUuid,
                    variables.variantUuid,
                ],
                refetchType: "all",
            });

        },

    });
}