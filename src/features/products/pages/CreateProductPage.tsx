// import { useNavigate } from "react-router-dom";
// import ProductForm from "../components/ProductForm";
// import { useCreateProduct } from "../hooks/useCreateProduct";
// import { useCategories } from "@/features/categories/hooks/useCategories";
// import { notification } from "@/lib/notification";
// import { ROUTES } from "@/app/router/route-paths";
// import type { ProductFormData } from "../validation/product.schema";
// import type { CreateProductPayload } from "../types/product";

// export default function CreateProductPage() {
//     const navigate = useNavigate();
//     const createProduct = useCreateProduct();

//     const { data: categoriesResponse } = useCategories({
//         page: 1,
//         per_page: 200,
//     });

//     const categories = (categoriesResponse?.data ?? []).map((category: any) => ({
//         label: category.name,
//         value: category.uuid,
//     }));

//     // Unit and tax-class endpoints already exist in the backend collection.
//     // Keep these options wired to the corresponding master-data hooks when those
//     // frontend master screens are added.
//     const units: { label: string; value: string }[] = [];
//     const taxClasses: { label: string; value: string }[] = [];

//     const handleSubmit = async (data: ProductFormData) => {
//         const payload: CreateProductPayload = {
//             ...data,
//             unit_id: data.unit_id,
//             tax_class_id: data.tax_class_id,
//             compare_price: data.compare_price,
//             cost_price: data.cost_price,
//         };

//         try {
//             const response = await createProduct.mutateAsync(payload);
//             const uuid = response.data.data?.uuid;

//             notification.success("Product created successfully.", "The product has been created.");
//             navigate(uuid ? `${ROUTES.PRODUCTS}/${uuid}` : ROUTES.PRODUCTS);
//         } catch {
//             notification.error("Unable to create product.", "Please check the form and try again.");
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-2xl font-semibold tracking-tight">Create Product</h1>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                     Create a product with pricing, inventory and catalog information.
//                 </p>
//             </div>

//             <ProductForm
//                 onSubmit={handleSubmit}
//                 loading={createProduct.isPending}
//                 categories={categories}
//                 units={units}
//                 taxClasses={taxClasses}
//                 onCancel={() => navigate(ROUTES.PRODUCTS)}
//             />
//         </div>
//     );
// }


import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useProductMasterData } from "../hooks/useProductMasterData";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { notification } from "@/lib/notification";
import { ROUTES } from "@/app/router/route-paths";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import type { ProductFormData } from "../validation/product.schema";
import type { CreateProductPayload } from "../types/product";

export default function CreateProductPage() {
    const navigate = useNavigate();
    const createProduct = useCreateProduct();

    const {
        data: categoriesResponse,
        isLoading: categoriesLoading,
    } = useCategories({
        page: 1,
        per_page: 100,
    });

    const {
        data: masterData,
        isLoading: masterDataLoading,
    } = useProductMasterData();

    const categories = (categoriesResponse?.data ?? []).map((category: any) => ({
        label: category.name,
        value: String(category.uuid ?? category.id),
    }));

    const handleSubmit = async (data: ProductFormData) => {
        const payload: CreateProductPayload = {
            ...data,
            unit_id: data.unit_id,
            tax_class_id: data.tax_class_id,
            compare_price: data.compare_price,
            cost_price: data.cost_price,
        };

        try {
            const response = await createProduct.mutateAsync(payload);
            const uuid = response.data.data?.uuid;

            notification.success(
                "Product created successfully.",
                "The product has been created."
            );

            navigate(
                uuid
                    ? `${ROUTES.PRODUCTS}/${uuid}`
                    : ROUTES.PRODUCTS
            );
        } catch {
            notification.error(
                "Unable to create product.",
                "Please check the form and try again."
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create Product
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Create a product with pricing, inventory and catalog information.
                </p>
            </div>

            <ProductForm
                onSubmit={handleSubmit}
                loading={createProduct.isPending}
                categories={categories}
                categoriesLoading={categoriesLoading}
                units={masterData?.units ?? []}
                taxClasses={masterData?.taxClasses ?? []}
                optionsLoading={masterDataLoading}
                serverErrors={getApiFieldErrors(createProduct.error)}
                serverMessage={getApiErrorMessage(createProduct.error)}
                onCancel={() => navigate(ROUTES.PRODUCTS)}
            />
        </div>
    );
}
