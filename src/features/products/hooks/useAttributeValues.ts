// import { useQuery } from "@tanstack/react-query";
// import { attributeService } from "../services/attribute.service";

// export function useAttributeValues() {
//     return useQuery({
//         queryKey: ["product-attribute-values"],
//         queryFn: async () => {
//             const response = await attributeService.values();
//             const rows = response.data?.data ?? response.data ?? [];
//             return rows.flatMap((attribute: any) =>
//                 (attribute.values ?? []).map((value: any) => ({
//                     uuid: value.uuid,
//                     label: `${attribute.name}: ${value.value}`,
//                 }))
//             );
//         },
//         staleTime: 60_000,
//     });
// }


import { useQuery } from "@tanstack/react-query";

import { attributeService } from "../services/attribute.service";

export interface AttributeValueOption {
    uuid: string;
    label: string;
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

function extractValues(attribute: any): any[] {
    if (Array.isArray(attribute?.values)) {
        return attribute.values;
    }

    if (Array.isArray(attribute?.attribute_values)) {
        return attribute.attribute_values;
    }

    if (Array.isArray(attribute?.attributeValues)) {
        return attribute.attributeValues;
    }

    return [];
}

function normalizeAttributeValues(attribute: any): AttributeValueOption[] {
    const attributeName =
        attribute?.name ??
        attribute?.display_name ??
        "Attribute";

    return extractValues(attribute)
        .map((value: any) => {
            const uuid = value?.uuid ?? value?.id;
            const displayValue =
                value?.display_value ??
                value?.displayValue ??
                value?.value ??
                "";

            if (uuid == null || !displayValue) {
                return null;
            }

            return {
                uuid: String(uuid),
                label: `${attributeName}: ${displayValue}`,
            };
        })
        .filter((item): item is AttributeValueOption => Boolean(item));
}

export function useAttributeValues() {
    return useQuery({
        queryKey: ["products", "attribute-values"],
        queryFn: async () => {
            const response = await attributeService.list({
                page: 1,
                per_page: 100,
                sort_by: "name",
                sort_order: "asc",
            });

            const attributes = extractRows(response);

            // Preferred API shape: attribute list already contains values.
            const directValues = attributes.flatMap(normalizeAttributeValues);

            if (directValues.length > 0) {
                return dedupe(directValues);
            }

            // Fallback for APIs where AttributeResource does not include values.
            // The collection provides GET /attributes/{uuid}; load the details
            // only when the list response did not include nested values.
            const attributesWithUuid = attributes.filter(
                (attribute) => attribute?.uuid
            );

            if (attributesWithUuid.length === 0) {
                return [];
            }

            const detailResponses = await Promise.all(
                attributesWithUuid.map((attribute) =>
                    attributeService.details(String(attribute.uuid))
                )
            );

            const detailValues = detailResponses.flatMap((detailResponse) => {
                const detailBody = detailResponse?.data;
                const attribute =
                    detailBody?.data ??
                    detailBody?.attribute ??
                    detailBody;

                return normalizeAttributeValues(attribute);
            });

            return dedupe(detailValues);
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

function dedupe(items: AttributeValueOption[]) {
    const map = new Map<string, AttributeValueOption>();

    items.forEach((item) => {
        map.set(item.uuid, item);
    });

    return Array.from(map.values());
}
