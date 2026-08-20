// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../services/product.service";

// export function useProductVariant(productUuid?: string, variantUuid?: string) {
//     return useQuery({
//         queryKey: ["product-variant", productUuid, variantUuid],
//         queryFn: async () => {
//             if (!productUuid || !variantUuid) {
//                 throw new Error("Product and variant UUID are required");
//             }
//             const response = await productService.variantDetails(productUuid, variantUuid);
//             return response.data.data;
//         },
//         enabled: Boolean(productUuid && variantUuid),
//     });
// }


import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { productService } from "../services/product.service";

export function useProductVariant(
    productUuid?: string,
    variantUuid?: string
) {
    return useQuery({

        queryKey: [
            QUERY_KEYS.PRODUCTS,
            "variant",
            productUuid,
            variantUuid,
        ],

        queryFn: async () => {

            if (!productUuid) {
                throw new Error(
                    "Product UUID is required"
                );
            }

            if (!variantUuid) {
                throw new Error(
                    "Product variant UUID is required"
                );
            }

            const response =
                await productService.variantDetails(
                    productUuid,
                    variantUuid
                );

            return response.data.data;

        },

        enabled:
            Boolean(productUuid) &&
            Boolean(variantUuid),

    });
}


// import { useQuery } from "@tanstack/react-query";

// import { QUERY_KEYS } from "@/constants/query-keys";

// import { productService } from "../services/product.service";

// export function useProductVariant(
//     productUuid?: string,
//     variantUuid?: string
// ) {

//     return useQuery({

//         queryKey: [
//             QUERY_KEYS.PRODUCTS,
//             "variant",
//             productUuid,
//             variantUuid,
//         ],

//         queryFn: async () => {

//             if (!productUuid) {
//                 throw new Error(
//                     "Product UUID is required"
//                 );
//             }

//             if (!variantUuid) {
//                 throw new Error(
//                     "Variant UUID is required"
//                 );
//             }

//             const response =
//                 await productService.variantDetails(
//                     productUuid,
//                     variantUuid
//                 );

//             return response.data.data;

//         },

//         enabled:
//             Boolean(
//                 productUuid &&
//                 variantUuid
//             ),

//         /*
//          * Important:
//          * Don't keep variant details
//          * permanently fresh.
//          */
//         staleTime: 0,

//         refetchOnMount: "always",

//         refetchOnWindowFocus: false,

//     });
// }