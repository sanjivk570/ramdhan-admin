import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";
import type { UpdateProductPayload } from "../types/product";

interface Variables {
    uuid: string;
    data: UpdateProductPayload;
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, data }: Variables) =>
            productService.update(uuid, data),
        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.PRODUCTS, "details", variables.uuid],
            });
        },
    });
}
