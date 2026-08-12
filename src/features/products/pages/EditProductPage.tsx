// import { useNavigate, useParams } from "react-router-dom";
// import ProductForm from "../components/ProductForm";
// import { useProduct } from "../hooks/useProduct";
// import { useUpdateProduct } from "../hooks/useUpdateProduct";
// import { useCategories } from "@/features/categories/hooks/useCategories";
// import { notification } from "@/lib/notification";
// import { ROUTES } from "@/app/router/route-paths";
// import type { ProductFormData } from "../validation/product.schema";
// import type { UpdateProductPayload } from "../types/product";

// export default function EditProductPage() {
//     const navigate = useNavigate();
//     const { uuid } = useParams<{ uuid: string }>();

//     const { data: product, isLoading, isError } = useProduct(uuid);
//     const updateProduct = useUpdateProduct();

//     const { data: categoriesResponse } = useCategories({
//         page: 1,
//         per_page: 200,
//     });

//     const categories = (categoriesResponse?.data ?? []).map((category: any) => ({
//         label: category.name,
//         value: category.uuid,
//     }));

//     const units: { label: string; value: string }[] = [];
//     const taxClasses: { label: string; value: string }[] = [];

//     if (!uuid) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-destructive">Product UUID is missing.</div>;
//     }

//     if (isLoading) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">Loading product...</div>;
//     }

//     if (isError || !product) {
//         return <div className="rounded-xl border bg-card p-6 text-sm text-destructive">Unable to load product.</div>;
//     }

//     const handleSubmit = async (data: ProductFormData) => {
//         const payload: UpdateProductPayload = {
//             ...data,
//             unit_id: data.unit_id,
//             tax_class_id: data.tax_class_id,
//         };

//         try {
//             await updateProduct.mutateAsync({ uuid, data: payload });
//             notification.success("Product updated successfully.", "The product information has been updated.");
//             navigate(`${ROUTES.PRODUCTS}/${uuid}`);
//         } catch {
//             notification.error("Unable to update product.", "Please check the form and try again.");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                     Update product catalog, pricing and inventory information.
//                 </p>
//             </div>

//             <ProductForm
//                 mode="edit"
//                 initialData={{
//                     name: product.name,
//                     slug: product.slug,
//                     sku: product.sku,
//                     description: product.description ?? "",
//                     short_description: product.short_description ?? "",
//                     unit_id: product.unit_id ?? undefined,
//                     tax_class_id: product.tax_class_id ?? undefined,
//                     price: Number(product.price),
//                     compare_price: product.compare_price == null ? undefined : Number(product.compare_price),
//                     cost_price: product.cost_price == null ? undefined : Number(product.cost_price),
//                     stock_quantity: product.stock_quantity,
//                     low_stock_threshold: product.low_stock_threshold,
//                     is_active: product.is_active,
//                     is_featured: product.is_featured,
//                     sort_order: product.sort_order,
//                     categories: product.categories?.map((category) => category.uuid) ?? [],
//                 }}
//                 categories={categories}
//                 units={units}
//                 taxClasses={taxClasses}
//                 loading={updateProduct.isPending}
//                 onSubmit={handleSubmit}
//                 onCancel={() => navigate(`${ROUTES.PRODUCTS}/${uuid}`)}
//             />
//         </div>
//     );
// }


import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useProductMasterData } from "../hooks/useProductMasterData";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import type { ProductFormData } from "../validation/product.schema";
import type { UpdateProductPayload } from "../types/product";

import ProductMediaManager from "../components/ProductMediaManager";

function normalizeCategoryUuid(category: any): string | null {
    if (!category) {
        return null;
    }

    const value = category.uuid ?? category.id;

    return value == null ? null : String(value);
}

export default function EditProductPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const {
        data: product,
        isLoading: productLoading,
        isError: productError,
    } = useProduct(uuid);

    const updateProduct = useUpdateProduct();

    const {
        data: categoriesResponse,
        isLoading: categoriesLoading,
    } = useCategories({
        page: 1,
        per_page: 100,
    });

    const { data: masterData, isLoading: masterDataLoading, isError: masterDataError, } = useProductMasterData();

    const categories = (categoriesResponse?.data ?? []).map((category: any) => ({
        label: category.name,
        value: String(category.uuid ?? category.id),
    }));

    const units = masterData?.units ?? [];
    const taxClasses = masterData?.taxClasses ?? [];
    if (!uuid) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-destructive">
                Product UUID is missing.
            </div>
        );
    }

    if (productLoading) {
        return (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                Loading product...
            </div>
        );
    }

    if (productError || !product) {
        return (
            <div className="space-y-4">
                <div className="rounded-xl border bg-card p-6">
                    <h2 className="text-lg font-semibold">Unable to load product</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        The requested product could not be loaded.
                    </p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (data: ProductFormData) => {
        const payload: UpdateProductPayload = {
            ...data,
            unit_id: data.unit_id,
            tax_class_id: data.tax_class_id,
        };

        try {
            await updateProduct.mutateAsync({
                uuid,
                data: payload,
            });

            notification.success(
                "Product updated successfully.",
                "The product information has been updated."
            );

            navigate(`${ROUTES.PRODUCTS}/${uuid}`);
        } catch {
            notification.error(
                "Unable to update product.",
                "Please check the form and try again."
            );
        }
    };

    const selectedCategories = (product.categories ?? [])
        .map(normalizeCategoryUuid)
        .filter((value): value is string => Boolean(value));
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Edit Product
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Update product catalog, pricing and classification information.
                </p>
            </div>

            {masterDataError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Unable to load unit and tax-class master data. Please refresh and try again.
                </div>
            )}

            <ProductForm
                mode="edit"
                initialData={{
                    
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    description: product.description ?? "",
                    short_description: product.short_description ?? "",
                    unit_id: product.unit_id ?? undefined,
                    tax_class_id: product.tax_class_id ?? undefined,
                    price: Number(product.price),
                    compare_price:
                        product.compare_price == null
                            ? undefined
                            : Number(product.compare_price),
                    cost_price:
                        product.cost_price == null
                            ? undefined
                            : Number(product.cost_price),
                    // stock_quantity: Number(product.stock_quantity ?? 0),
                    // low_stock_threshold: Number(product.low_stock_threshold ?? 5),

                    stock_quantity: Number(product.inventory?.quantity ?? 0),
                    low_stock_threshold: Number(product.inventory?.low_stock_threshold ?? 5),

                    is_active: Boolean(product.is_active),
                    is_featured: Boolean(product.is_featured),
                    sort_order: Number(product.sort_order ?? 0),
                    categories: selectedCategories,
                }}
                categories={categories}
                categoriesLoading={categoriesLoading}
                units={units}
                taxClasses={taxClasses}
                optionsLoading={masterDataLoading}
                loading={updateProduct.isPending}
                serverErrors={getApiFieldErrors(updateProduct.error)}
                serverMessage={getApiErrorMessage(updateProduct.error)}
                onSubmit={handleSubmit}
                onCancel={() => navigate(`${ROUTES.PRODUCTS}/${uuid}`)}
            />

            <ProductMediaManager
                productUuid={uuid}
                media={(product.images ?? []) as any}
            />

        </div>
    );
}
