import {
    useNavigate,
    useParams,
} from "react-router-dom";

import type { AxiosError } from "axios";

import CategoryForm from "../components/CategoryForm";

import { useCategory } from "../hooks/useCategory";

import { useUpdateCategory } from "../hooks/useUpdateCategory";

import { useCategories } from "../hooks/useCategories";

import type {
    CategoryFormData,
} from "../validation/category.schema";

import type {
    UpdateCategoryPayload,
} from "../types/category";

import { ROUTES } from "../../../app/router/route-paths";

import { notification } from "@/lib/notification";

interface ApiErrorResponse {
    message?: string;

    errors?: Record<
        string,
        string[] | string
    >;
}

export default function EditCategoryPage() {

    const navigate = useNavigate();

    const { uuid } = useParams<{
        uuid: string;
    }>();

    const { data: category, isLoading: categoryLoading, isError: categoryError } = useCategory(uuid);

    const updateCategory =
        useUpdateCategory();

    /*
     * Load categories for Parent Category dropdown.
     *
     * Current category should not be selected
     * as its own parent.
     */
    const {
        data: categoriesResponse,
        isLoading: categoriesLoading,
    } = useCategories({
        page: 1,
        per_page: 100,
    });

    const categories =
        categoriesResponse?.data
            ?.filter(
                (item) =>
                    String(item.uuid) !==
                    String(uuid)
            )
            .map((item) => ({
                label: item.name,
                value: String(item.id),
            })) ?? [];

    const handleSubmit = async (
        data: CategoryFormData
    ) => {

        if (!uuid) {
            return;
        }

        const payload: UpdateCategoryPayload = {
            name: data.name,

            parent_id:
                data.parent_id
                    ? Number(data.parent_id)
                    : null,

            is_active:
                data.is_active,

            sort_order:
                data.sort_order
                    ? Number(data.sort_order)
                    : 0,

            description:
                data.description?.trim() ||
                undefined,
        };

        try {

            await updateCategory.mutateAsync({
                uuid: String(uuid),
                data: payload,
            });

            notification.success(
                "Category updated successfully.",
                "The category has been updated."
            );

            navigate(
                ROUTES.CATEGORIES
            );

        } catch {

            notification.error(
                "Unable to update category.",
                "Please check the form and try again."
            );

        }
    };

    const error =
        updateCategory.error as
        AxiosError<ApiErrorResponse> | null;

    /*
     * Invalid ID
     */
    if (!uuid) {

        return (
            <div className="space-y-4">

                <h1 className="text-2xl font-semibold">
                    Invalid Category
                </h1>

                <p className="text-sm text-muted-foreground">
                    Category ID is missing.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            ROUTES.CATEGORIES
                        )
                    }
                    className="
                        rounded-md
                        border
                        px-4
                        py-2
                        text-sm
                    "
                >
                    Back to Categories
                </button>

            </div>
        );
    }

    /*
     * Loading
     */
    if (
        categoryLoading ||
        categoriesLoading
    ) {

        return (
            <div className="space-y-6">

                <div>

                    <h1 className="text-2xl font-semibold">
                        Edit Category
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Loading category information...
                    </p>

                </div>

                <div className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    text-sm
                    text-muted-foreground
                ">
                    Loading category...
                </div>

            </div>
        );
    }

    /*
     * Not Found
     */
    if (
        categoryError ||
        !category
    ) {
        return (
            <div className="space-y-4">

                <h1 className="text-2xl font-semibold">
                    Category Not Found
                </h1>

                <p className="
                    text-sm
                    text-muted-foreground
                ">
                    Unable to load the requested category.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            ROUTES.CATEGORIES
                        )
                    }
                    className="
                        rounded-md
                        border
                        px-4
                        py-2
                        text-sm
                    "
                >
                    Back to Categories
                </button>

            </div>
        );
    }

    return (
console.log(category),
        <div className="space-y-6">

            {/* Page Header */}

            <div>

                <h1 className="
                    text-2xl
                    font-semibold
                    tracking-tight
                ">
                    Edit Category
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    Update category information.
                </p>

            </div>

            {/* Form */}

            <CategoryForm

                initialValues={
                    
                    {
                    name:
                        category.name ?? "",
                    
                    // slug:
                    //     category.slug ?? "",

                    parent_id:
                        category.parent?.id
                            ? String(
                                category.parent?.id
                            )
                            : "",

                    description:
                        category.description ??
                        "",

                    is_active:
                        Boolean(
                            category.is_active
                        ),

                    sort_order:
                        category.sort_order ??
                        0,
                }}

                categories={
                    categories
                }

                categoriesLoading={
                    categoriesLoading
                }

                onSubmit={
                    handleSubmit
                }

                loading={
                    updateCategory.isPending
                }

                serverErrors={
                    error?.response?.data?.errors
                    ?? {}
                }

                serverMessage={
                    error?.response?.data?.message
                }

                onCancel={() =>
                    navigate(
                        ROUTES.CATEGORIES
                    )
                }

                mode="edit"
            />

        </div>
    );
}
