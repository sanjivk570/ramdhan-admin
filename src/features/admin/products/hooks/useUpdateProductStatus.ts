import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { productService } from "../services/product.service";

interface Variables {
    uuid: string;
    status: boolean;
}

export function useUpdateProductStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ uuid, status }: Variables) =>
            productService.updateStatus(uuid, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
        },
    });
}
