import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";

export function useProductVariants(productUuid?: string) {
    return useQuery({
        queryKey: [QUERY_KEYS.PRODUCTS, "variants", productUuid],
        queryFn: async () => {
            if (!productUuid) throw new Error("Product UUID is required");
            const response = await productService.variants(productUuid);
            return response.data.data ?? [];
        },
        enabled: Boolean(productUuid),
    });
}
