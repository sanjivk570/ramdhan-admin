// import { useNavigate, useParams } from "react-router-dom";
// import ProductVariantForm from "../components/ProductVariantForm";
// import { useCreateProductVariant } from "../hooks/useCreateProductVariant";
// import { useAttributeValues } from "../hooks/useAttributeValues";
// import { notification } from "@/lib/notification";
// import { ROUTES } from "@/app/router/route-paths";
// import type { ProductVariantFormData } from "../validation/product-variant.schema";

// export default function CreateProductVariantPage() {
//     const navigate = useNavigate();
//     const { uuid: productUuid } = useParams<{ uuid: string }>();

//     const createVariant = useCreateProductVariant(productUuid ?? "");
//     const { data: attributes = [] } = useAttributeValues();

//     if (!productUuid) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-destructive">Product UUID is missing.</div>;
//     }

//     const submit = async (data: ProductVariantFormData) => {
//         try {
//             await createVariant.mutateAsync(data);
//             notification.success("Variant created successfully.", "The product variant has been created.");
//             navigate(`${ROUTES.PRODUCTS}/${productUuid}`);
//         } catch {
//             notification.error("Unable to create variant.", "Please check the form and try again.");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-semibold tracking-tight">Create Product Variant</h1>
//                 <p className="mt-1 text-sm text-muted-foreground">Add a variant to the selected product.</p>
//             </div>
//             <ProductVariantForm
//                 attributes={attributes}
//                 loading={createVariant.isPending}
//                 onSubmit={submit}
//                 onCancel={() => navigate(`${ROUTES.PRODUCTS}/${productUuid}`)}
//             />
//         </div>
//     );
// }


import { useNavigate, useParams } from "react-router-dom";

import ProductVariantForm from "../components/ProductVariantForm";
import { useCreateProductVariant } from "../hooks/useCreateProductVariant";
import { useAttributeValues } from "../hooks/useAttributeValues";

import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import type { ProductVariantFormData } from "../validation/product-variant.schema";

export default function CreateProductVariantPage() {
    const navigate = useNavigate();
    const { uuid: productUuid } = useParams<{ uuid: string }>();

    const createVariant = useCreateProductVariant(productUuid ?? "");

    const {
        data: attributes = [],
        isLoading: attributesLoading,
        isError: attributesError,
    } = useAttributeValues();

    if (!productUuid) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-destructive">
                Product UUID is missing.
            </div>
        );
    }

    const submit = async (data: ProductVariantFormData) => {
        try {
            await createVariant.mutateAsync(data);

            notification.success(
                "Variant created successfully.",
                "The product variant has been created."
            );

            navigate(`${ROUTES.PRODUCTS}/${productUuid}`);
        } catch {
            notification.error(
                "Unable to create variant.",
                "Please check the form and try again."
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create Product Variant
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Create a variant for the selected product.
                </p>
            </div>

            {attributesError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Unable to load product attributes. Please refresh and try again.
                </div>
            )}

            <ProductVariantForm
                attributes={attributes}
                attributesLoading={attributesLoading}
                loading={createVariant.isPending}
                serverErrors={getApiFieldErrors(createVariant.error)}
                serverMessage={getApiErrorMessage(createVariant.error)}
                onSubmit={submit}
                onCancel={() =>
                    navigate(`${ROUTES.PRODUCTS}/${productUuid}`)
                }
            />
        </div>
    );
}
