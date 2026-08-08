import { useNavigate } from "react-router-dom";

import { useCreateCategory } from "../hooks/useCreateCategory";
import CategoryForm from "../components/CategoryForm";

import type { CategoryFormData } from "../validation/category.schema";

import type { CreateCategoryPayload } from "../types/category";

import { ROUTES } from "@/app/router/route-paths";

import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";

import { notification } from "@/lib/notification";

import { useCategories } from "../hooks/useCategories";


export default function CreateCategoryPage() {

    const navigate = useNavigate();

    const createCategory =
        useCreateCategory();


    /*
    |--------------------------------------------------------------------------
    | Parent Categories
    |--------------------------------------------------------------------------
    */

    const {
        data: categoriesResponse,
        isLoading: categoriesLoading,
    } = useCategories({
        page: 1,
        per_page: 100,
    });


    const categories =
        categoriesResponse?.data ?? [];


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (
        data: CategoryFormData
    ) => {

        const payload: CreateCategoryPayload = {

            name:
                data.name.trim(),

            // slug:
            //     data.slug.trim(),

            description:
                data.description?.trim() ||
                undefined,

            parent_id:
                data.parent_id
                    ? Number(data.parent_id)
                    : undefined,

            sort_order:
                Number(data.sort_order ?? 0),

            is_active:
                data.is_active,

        };


        try {

            await createCategory.mutateAsync(
                payload
            );


            notification.success(
                "Category created successfully.",
                "The category has been created."
            );


            navigate(
                ROUTES.CATEGORIES
            );

        } catch {

            notification.error(
                "Unable to create category.",
                "Please check the form and try again."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-6">

            {/* Page Header */}

            <div>

                <h1 className="
                    text-2xl
                    font-semibold
                    tracking-tight
                ">
                    Create Category
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    Create a new product category.
                </p>

            </div>


            {/* Form */}

            <CategoryForm

                onSubmit={
                    handleSubmit
                }

                loading={
                    createCategory.isPending
                }


                /*
                |--------------------------------------------------------------------------
                | Parent Categories
                |--------------------------------------------------------------------------
                */

                // categories={
                //     categories.map(
                //         (category) => (
                //             {
                            
                //             label:
                //                 category.name,

                //             value:
                //                 String(
                //                     category.id
                //                 ),
                //         })
                //     )
                // }

                categories={
                    categories.map((category) => ({
                        label: category.name,
                        value: String(category.id),
                    }))
                }

                categoriesLoading={
                    categoriesLoading
                }


                /*
                |--------------------------------------------------------------------------
                | API Errors
                |--------------------------------------------------------------------------
                */

                serverErrors={
                    getApiFieldErrors(
                        createCategory.error
                    )
                }

                serverMessage={
                    getApiErrorMessage(
                        createCategory.error
                    )
                }


                /*
                |--------------------------------------------------------------------------
                | Cancel
                |--------------------------------------------------------------------------
                */

                onCancel={() =>
                    navigate(
                        ROUTES.CATEGORIES
                    )
                }

            />

        </div>

    );
}