import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invoiceService } from "../services/invoice.service";
import type { GenerateInvoicePayload } from "../types/invoice";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useGenerateInvoice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: GenerateInvoicePayload) =>
            invoiceService.generate(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.INVOICES],
            });
        },
    });
}
