import {
    useEffect,
} from "react";

import {
    useForm,
    Controller,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    Button,
} from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    categorySchema,
    editCategorySchema,
    type CategoryFormData,
} from "../validation/category.schema";


interface CategoryOption {
    label: string;
    value: string;
}


interface CategoryFormProps {

    mode?: "create" | "edit";

    initialValues?: CategoryFormData;

    loading?: boolean;

    categories?: CategoryOption[];

    categoriesLoading?: boolean;

    serverErrors?: Record<
        string,
        string[] | string
    >;

    serverMessage?: string;

    onSubmit: (
        data: CategoryFormData
    ) => void | Promise<void>;

    onCancel?: () => void;

}


export default function CategoryForm({

    mode = "create",

    initialValues,

    loading = false,

    categories = [],

    categoriesLoading = false,

    serverErrors = {},

    serverMessage,

    onSubmit,

    onCancel,

}: CategoryFormProps) {

    const isEdit = mode === "edit";
    
    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<CategoryFormData>({

        // resolver:
        //     zodResolver(
        //         categorySchema
        //     ),

        resolver: zodResolver(
                    isEdit
                        ? editCategorySchema
                        : categorySchema
                ) as never,

        defaultValues: {

            name: "",

            //slug: "",

            description: "",

            parent_id: "",

            sort_order: 0,

            is_active: true,

        },

    });


    /*
    |--------------------------------------------------------------------------
    | Reset when editing
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (initialValues) {

            reset(
                initialValues
            );

        }

    }, [
        initialValues,
        reset,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Server Error
    |--------------------------------------------------------------------------
    */

    const getServerError = (
        field: string
    ) => {

        const error =
            serverErrors[field];

        if (!error) {

            return null;

        }

        return Array.isArray(error)
            ? error[0]
            : error;

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const submitHandler = (
        data: CategoryFormData
    ) => {

        onSubmit(data);

    };


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <form
            onSubmit={
                handleSubmit(
                    submitHandler
                )
            }
            className="space-y-6"
        >


            {/* API Error */}

            {serverMessage && (

                <div className="
                    rounded-lg
                    border
                    border-destructive/30
                    bg-destructive/10
                    px-4
                    py-3
                    text-sm
                    text-destructive
                ">

                    {serverMessage}

                </div>

            )}


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
                        Configure the category details.
                    </p>

                </div>


                {/* Fields */}

                <div className="
                    grid
                    gap-5
                    p-6
                    md:grid-cols-2
                ">


                    {/* Name */}

                    <div className="space-y-2">

                        <label
                            htmlFor="name"
                            className="
                                text-sm
                                font-medium
                            "
                        >

                            Category Name

                            <span className="
                                ml-1
                                text-destructive
                            ">
                                *
                            </span>

                        </label>


                        <Input
                            id="name"
                            placeholder="Enter category name"
                            {...register("name")}
                        />


                        {errors.name && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .name
                                        .message
                                }
                            </p>

                        )}


                        {getServerError(
                            "name"
                        ) && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    getServerError(
                                        "name"
                                    )
                                }
                            </p>

                        )}

                    </div>


                    {/* Slug */}

                    {/* <div className="space-y-2">

                        <label
                            htmlFor="slug"
                            className="
                                text-sm
                                font-medium
                            "
                        >

                            Slug

                            <span className="
                                ml-1
                                text-destructive
                            ">
                                *
                            </span>

                        </label>


                        <Input
                            id="slug"
                            placeholder="category-slug"
                            {...register("slug")}
                        />


                        <p className="
                            text-xs
                            text-muted-foreground
                        ">
                            Use lowercase letters,
                            numbers and hyphens.
                        </p>


                        {errors.slug && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .slug
                                        .message
                                }
                            </p>

                        )}


                        {getServerError(
                            "slug"
                        ) && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    getServerError(
                                        "slug"
                                    )
                                }
                            </p>

                        )}

                    </div> */}


                    {/* Parent Category */}

                    <div className="space-y-2">

                        <label className="
                            text-sm
                            font-medium
                        ">
                            Parent Category
                        </label>

                        <Controller
                            name="parent_id"
                            control={control}
                            render={({ field }) => {

                                const selectedCategory =
                                    categories.find(
                                        (category) =>
                                            category.value ===
                                            String(field.value ?? "")
                                    );

                                return (
                                    <Select
                                        value={
                                            field.value || "none"
                                        }
                                        onValueChange={(value) => {

                                            field.onChange(
                                                value === "none"
                                                    ? ""
                                                    : value
                                            );

                                        }}
                                        disabled={
                                            categoriesLoading ||
                                            loading
                                        }
                                    >

                                        <SelectTrigger>

                                            <SelectValue
                                                placeholder={
                                                    categoriesLoading
                                                        ? "Loading categories..."
                                                        : "Select parent category"
                                                }
                                            >
                                                {selectedCategory?.label}
                                            </SelectValue>

                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="none">
                                                No Parent
                                            </SelectItem>

                                            {categories.map(
                                                (category) => (
                                                    <SelectItem
                                                        key={
                                                            category.value
                                                        }
                                                        value={
                                                            category.value
                                                        }
                                                    >
                                                        {category.label}
                                                    </SelectItem>

                                                )
                                            )}

                                        </SelectContent>

                                    </Select>
                                );
                            }}
                        />


                        {errors.parent_id && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .parent_id
                                        .message
                                }
                            </p>

                        )}


                        {getServerError(
                            "parent_id"
                        ) && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    getServerError(
                                        "parent_id"
                                    )
                                }
                            </p>

                        )}

                    </div>


                    {/* Sort Order */}

                    <div className="space-y-2">

                        <label
                            htmlFor="sort_order"
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Sort Order
                        </label>


                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            placeholder="0"
                            {...register(
                                "sort_order",
                                {
                                    valueAsNumber: true,
                                }
                            )}
                        />


                        {errors.sort_order && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .sort_order
                                        .message
                                }
                            </p>

                        )}

                    </div>


                    {/* Description */}

                    <div className="
                        space-y-2
                        md:col-span-2
                    ">

                        <label
                            htmlFor="description"
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Description
                        </label>


                        <Textarea
                            id="description"
                            placeholder="Describe this category..."
                            rows={4}
                            {...register(
                                "description"
                            )}
                        />


                        {errors.description && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .description
                                        .message
                                }
                            </p>

                        )}


                        {getServerError(
                            "description"
                        ) && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    getServerError(
                                        "description"
                                    )
                                }
                            </p>

                        )}

                    </div>


                    {/* Status */}

                    <div className="space-y-2">

                        <label className="
                            text-sm
                            font-medium
                        ">
                            Status
                        </label>


                        <Controller
                            name="is_active"
                            control={control}
                            render={({
                                field,
                            }) => (
                                <Select

                                    value={
                                        field.value
                                            ? "Active"
                                            : "Inactive"
                                    }

                                    onValueChange={(
                                        value
                                    ) =>
                                        field.onChange(
                                            value === "1"
                                        )
                                    }

                                    disabled={
                                        loading
                                    }

                                >

                                    <SelectTrigger>

                                        <SelectValue />

                                    </SelectTrigger>


                                    <SelectContent>

                                        <SelectItem value="1">
                                            Active
                                        </SelectItem>

                                        <SelectItem value="0">
                                            Inactive
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            )}
                        />


                        {errors.is_active && (

                            <p className="
                                text-sm
                                text-destructive
                            ">
                                {
                                    errors
                                        .is_active
                                        .message
                                }
                            </p>

                        )}

                    </div>

                </div>

            </div>


            {/* Actions */}

            <div className="
                flex
                items-center
                justify-end
                gap-3
            ">


                {onCancel && (

                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={
                            onCancel
                        }
                    >
                        Cancel
                    </Button>

                )}


                <Button
                    type="submit"
                    disabled={loading}
                >

                    {/* {loading
                        ? "Creating..."
                        : "Create Category"} */}
                    {loading
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                            ? "Update Category"
                            : "Create Category"
                    }

                </Button>

            </div>

        </form>

    );

}