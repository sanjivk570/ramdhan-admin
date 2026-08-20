import { useQuery } from "@tanstack/react-query";

import { catalogService } from "../services/catalog.service";

export interface ProductOption {
    label: string;
    value: string;
}

function extractRows(response: any): any[] {
    const body = response?.data;

    if (Array.isArray(body)) {
        return body;
    }

    if (Array.isArray(body?.data)) {
        return body.data;
    }

    if (Array.isArray(body?.items)) {
        return body.items;
    }

    return [];
}

export function useProductMasterData() {
    return useQuery({
        queryKey: ["products", "master-data"],
        queryFn: async () => {
            const [unitsResponse, taxClassesResponse] = await Promise.all([
                catalogService.units({
                    page: 1,
                    per_page: 10,
                    sort_by: "name",
                    sort_order: "asc",
                }),
                catalogService.taxClasses({
                    page: 1,
                    per_page: 10,
                    sort_by: "name",
                    sort_order: "asc",
                }),
            ]);

            const units: ProductOption[] = extractRows(unitsResponse)
                .filter((item) => item?.is_active !== false)
                .map((item) => ({
                    label: item.symbol
                        ? `${item.name} (${item.symbol})`
                        : item.name,
                    // products.unit_id is the numeric FK.
                    value: String(item.id),
                }))
                .filter((item) => item.value !== "undefined");

            const taxClasses: ProductOption[] = extractRows(taxClassesResponse)
                .filter((item) => item?.is_active !== false)
                .map((item) => ({
                    label: item.code
                        ? `${item.name} (${item.code})`
                        : item.name,
                    // products.tax_class_id is the numeric FK.
                    value: String(item.id),
                }))
                .filter((item) => item.value !== "undefined");

            return {
                units,
                taxClasses,
            };
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}
