import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useProductVariant(productUuid?: string, variantUuid?: string) {
    return useQuery({
        queryKey: ["product-variant", productUuid, variantUuid],
        queryFn: async () => {
            if (!productUuid || !variantUuid) {
                throw new Error("Product and variant UUID are required");
            }
            const response = await productService.variantDetails(productUuid, variantUuid);
            return response.data.data;
        },
        enabled: Boolean(productUuid && variantUuid),
    });
}
