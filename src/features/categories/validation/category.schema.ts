import { z } from "zod";


/**
 * Base Category Fields
 *
 * Shared between Create and Edit Category.
 */
const baseCategorySchema = {

    name: z
        .string()
        .trim()
        .min(
            2,
            "Category name must be at least 2 characters"
        )
        .max(
            100,
            "Category name cannot exceed 100 characters"
        ),

    // slug: z
    //     .string()
    //     .trim()
    //     .min(
    //         2,
    //         "Slug must be at least 2 characters"
    //     )
    //     .max(
    //         100,
    //         "Slug cannot exceed 100 characters"
    //     )
    //     .regex(
    //         /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    //         "Slug can only contain lowercase letters, numbers and hyphens"
    //     ),

    description: z
        .string()
        .trim()
        .max(
            500,
            "Description cannot exceed 500 characters"
        )
        .optional()
        .or(z.literal("")),

    /**
     * Parent category is optional.
     *
     * Empty string means root category.
     */
    parent_id: z
        .string()
        .optional()
        .or(z.literal("")),

    sort_order: z
        .number()
        .int(
            "Sort order must be a whole number"
        )
        .min(
            0,
            "Sort order cannot be negative"
        ),

    /**
     * Form uses boolean.
     * API payload will receive true / false.
     */
    is_active: z.boolean(),

};


/**
 * Create Category
 */
export const categorySchema = z.object({

    ...baseCategorySchema,

});


/**
 * Edit Category
 *
 * Same fields are used while editing.
 */
export const editCategorySchema = z.object({

    ...baseCategorySchema,

});


export type CategoryFormData =
    z.infer<typeof categorySchema>;


export type EditCategoryFormData =
    z.infer<typeof editCategorySchema>;
