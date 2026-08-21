import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "../services/invoice.service";
import type { InvoiceListParams } from "../types/invoice";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useInvoices(params: InvoiceListParams) {
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICES, params],
        queryFn: async () => {
            const response = await invoiceService.list(params);
            return response.data;
        },
        placeholderData: (previousData) => previousData,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
}
