import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { useCategory } from "../hooks/useCategory";

import { ROUTES } from "@/app/router/route-paths";

export default function CategoryDetailPage() {

    const navigate = useNavigate();

    const { uuid } = useParams<{
        uuid: string;
    }>();

    const {
        data: category,
        isLoading,
        isError,
    } = useCategory(uuid);

    /*
     * Invalid UUID
     */
    if (!uuid) {

        return (
            <div className="space-y-4">

                <h1 className="text-2xl font-semibold">
                    Invalid Category
                </h1>

                <p className="text-sm text-muted-foreground">
                    Category UUID is missing.
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
    if (isLoading) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-semibold">
                        Category Details
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
     * Not Found / Error
     */
    if (isError || !category) {

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

        <div className="space-y-6">

            {/* Page Header */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <div>

                    <h1 className="
                        text-2xl
                        font-semibold
                        tracking-tight
                    ">
                        Category Details
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        View category information.
                    </p>

                </div>

                <div className="flex gap-2">

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
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `${ROUTES.CATEGORIES}/${category.uuid}/edit`
                            )
                        }
                        className="
                            rounded-md
                            bg-primary
                            px-4
                            py-2
                            text-sm
                            text-primary-foreground
                        "
                    >
                        Edit Category
                    </button>

                </div>

            </div>


            {/* Category Information */}

            <div className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            ">

                {/* Header */}

                <div className="
                    border-b
                    bg-muted/20
                    px-6
                    py-4
                ">

                    <h2 className="
                        text-base
                        font-semibold
                    ">
                        Category Information
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Details of the selected category.
                    </p>

                </div>


                {/* Details */}

                <div className="
                    grid
                    gap-6
                    p-6
                    md:grid-cols-2
                ">

                    {/* Name */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Category Name
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                        ">
                            {category.name || "-"}
                        </p>

                    </div>


                    {/* Slug */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Slug
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                        ">
                            {category.slug || "-"}
                        </p>

                    </div>


                    {/* Parent Category */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Parent Category
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                        ">
                            {category.parent?.name || "-"}
                        </p>

                    </div>


                    {/* Sort Order */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Sort Order
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            font-medium
                        ">
                            {category.sort_order ?? 0}
                        </p>

                    </div>


                    {/* Status */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Status
                        </p>

                        <span
                            className={`
                                mt-1
                                inline-flex
                                rounded-full
                                px-2.5
                                py-1
                                text-xs
                                font-medium
                                ${
                                    category.is_active
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }
                            `}
                        >
                            {category.is_active
                                ? "Active"
                                : "Inactive"}
                        </span>

                    </div>


                    {/* Description */}

                    <div className="
                        md:col-span-2
                    ">

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Description
                        </p>

                        <p className="
                            mt-1
                            whitespace-pre-wrap
                            text-sm
                        ">
                            {category.description || "-"}
                        </p>

                    </div>


                    {/* Created */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Created
                        </p>

                        <p className="
                            mt-1
                            text-sm
                        ">
                            {category.created_at || "-"}
                        </p>

                    </div>


                    {/* Updated */}

                    <div>

                        <p className="
                            text-sm
                            text-muted-foreground
                        ">
                            Last Updated
                        </p>

                        <p className="
                            mt-1
                            text-sm
                        ">
                            {category.updated_at || "-"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}