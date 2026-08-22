import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "../services/invoice.service";
import type { Invoice } from "../types/invoice";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useInvoice(uuid: string | undefined) {
    return useQuery({
        queryKey: [QUERY_KEYS.INVOICES, uuid],
        queryFn: async () => {
            if (!uuid) {
                return undefined;
            }
            const response =
                await invoiceService.details(uuid);
            return response.data.data as Invoice;
        },
        enabled: Boolean(uuid),
    });
}
