// import { useNavigate, useParams } from "react-router-dom";
// import ProductVariantForm from "../components/ProductVariantForm";
// import { useProductVariant } from "../hooks/useProductVariant";
// import { useUpdateProductVariant } from "../hooks/useUpdateProductVariant";
// import { useAttributeValues } from "../hooks/useAttributeValues";
// import { notification } from "@/lib/notification";
// import { ROUTES } from "@/app/router/route-paths";
// import type { ProductVariantFormData } from "../validation/product-variant.schema";

// export default function EditProductVariantPage() {
//     const navigate = useNavigate();
//     const { uuid: productUuid, variantUuid } = useParams<{
//         uuid: string;
//         variantUuid: string;
//     }>();

//     const { data: variant, isLoading, isError } = useProductVariant(productUuid, variantUuid);
//     const updateVariant = useUpdateProductVariant(productUuid ?? "");
//     const { data: attributes = [] } = useAttributeValues();

//     if (!productUuid || !variantUuid) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-destructive">Product or variant UUID is missing.</div>;
//     }

//     if (isLoading) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading variant...</div>;
//     }

//     if (isError || !variant) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-destructive">Unable to load variant.</div>;
//     }

//     const submit = async (data: ProductVariantFormData) => {
//         try {
//             await updateVariant.mutateAsync({ variantUuid, data });
//             notification.success("Variant updated successfully.", "The product variant has been updated.");
//             navigate(`${ROUTES.PRODUCTS}/${productUuid}`);
//         } catch {
//             notification.error("Unable to update variant.", "Please check the form and try again.");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-semibold tracking-tight">Edit Product Variant</h1>
//                 <p className="mt-1 text-sm text-muted-foreground">Update the selected product variant.</p>
//             </div>

//             <ProductVariantForm
//                 mode="edit"
//                 initialData={{
//                     name: variant.name,
//                     sku: variant.sku,
//                     price: Number(variant.price),
//                     compare_price: variant.compare_price == null ? undefined : Number(variant.compare_price),
//                     cost_price: variant.cost_price == null ? undefined : Number(variant.cost_price),
//                     stock_quantity: variant.stock_quantity,
//                     low_stock_threshold: variant.low_stock_threshold,
//                     is_default: variant.is_default,
//                     is_active: variant.is_active,
//                     sort_order: variant.sort_order,
//                     attribute_values: variant.attribute_values?.map((item) => item.uuid) ?? [],
//                 }}
//                 attributes={attributes}
//                 loading={updateVariant.isPending}
//                 onSubmit={submit}
//                 onCancel={() => navigate(`${ROUTES.PRODUCTS}/${productUuid}`)}
//             />
//         </div>
//     );
// }


import { useNavigate, useParams } from "react-router-dom";

import ProductVariantForm from "../components/ProductVariantForm";
import { useProductVariant } from "../hooks/useProductVariant";
import { useUpdateProductVariant } from "../hooks/useUpdateProductVariant";
import { useAttributeValues } from "../hooks/useAttributeValues";

import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import type { ProductVariantFormData } from "../validation/product-variant.schema";

function getAttributeValueUuid(item: any): string | null {
    if (!item) {
        return null;
    }

    const value =
        item.uuid ??
        item.attribute_value?.uuid ??
        item.attributeValue?.uuid ??
        item.id;

    return value == null ? null : String(value);
}

export default function EditProductVariantPage() {
    const navigate = useNavigate();

    const {uuid: productUuid, variantUuid: variantUuid } = useParams<{
        uuid: string;
        variantUuid: string;
    }>();

    const {
        data: variant,
        isLoading,
        isError,
    } = useProductVariant(productUuid, variantUuid);

    const updateVariant = useUpdateProductVariant(
        productUuid ?? ""
    );

    const {
        data: attributes = [],
        isLoading: attributesLoading,
        isError: attributesError,
    } = useAttributeValues();

    if (!productUuid || !variantUuid) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-destructive">
                Product or variant UUID is missing.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                Loading variant...
            </div>
        );
    }

    if (isError || !variant) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-destructive">
                Unable to load variant.
            </div>
        );
    }

    const submit = async (data: ProductVariantFormData) => {
        try {
            await updateVariant.mutateAsync({
                variantUuid,
                data,
            });

            notification.success(
                "Variant updated successfully.",
                "The product variant has been updated."
            );

            navigate(`${ROUTES.PRODUCTS}/${productUuid}`);
        } catch {
            notification.error(
                "Unable to update variant.",
                "Please check the form and try again."
            );
        }
    };

    const selectedAttributeValues = (variant.attribute_values ?? [])
        .map(getAttributeValueUuid)
        .filter((value): value is string => Boolean(value));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Edit Product Variant
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Update the selected product variant and its attribute values.
                </p>
            </div>

            {attributesError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Unable to load product attributes. Please refresh and try again.
                </div>
            )}

            <ProductVariantForm
                mode="edit"
                initialData={{
                    name: variant.name,
                    sku: variant.sku,
                    price: Number(variant.price),
                    compare_price:
                        variant.compare_price == null
                            ? undefined
                            : Number(variant.compare_price),
                    cost_price:
                        variant.cost_price == null
                            ? undefined
                            : Number(variant.cost_price),
                    stock_quantity: Number(variant.stock_quantity ?? 0),
                    low_stock_threshold: Number(
                        variant.low_stock_threshold ?? 5
                    ),
                    is_default: Boolean(variant.is_default),
                    is_active: Boolean(variant.is_active),
                    sort_order: Number(variant.sort_order ?? 0),
                    attribute_values: selectedAttributeValues,
                }}
                attributes={attributes}
                attributesLoading={attributesLoading}
                loading={updateVariant.isPending}
                serverErrors={getApiFieldErrors(updateVariant.error)}
                serverMessage={getApiErrorMessage(updateVariant.error)}
                onSubmit={submit}
                onCancel={() =>
                    navigate(`${ROUTES.PRODUCTS}/${productUuid}`)
                }
            />
        </div>
    );
}
