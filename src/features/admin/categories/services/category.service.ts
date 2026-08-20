import axiosClient from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";

import type {
    Category,
    CategoryListParams,
    CreateCategoryPayload,
    UpdateCategoryPayload,
} from "../types/category";

import type {
    PaginatedResponse,
} from "@/types/api";

export const categoryService = {

    /**
     * Category List
     */
    list(
        params: CategoryListParams
    ) {
        return axiosClient.get<
            PaginatedResponse<Category>
        >(
            ENDPOINTS.categories.list,
            {
                params,
            }
        );
    },

    /**
     * Category Details
     */
    details(
        uuid: string
    ) {
        return axiosClient.get<{
            success: boolean;
            message: string;
            data: Category;
            errors: null;
            meta: null;
        }>(
            ENDPOINTS.categories.details(uuid)
        );
    },

    /**
     * Create Category
     */
    create(
        data: CreateCategoryPayload
    ) {
        return axiosClient.post(
            ENDPOINTS.categories.create,
            data
        );
    },

    /**
     * Update Category
     */
    update(
        uuid: string,
        data: UpdateCategoryPayload
    ) {
        return axiosClient.put(
            ENDPOINTS.categories.update(uuid),
            data
        );
    },

    /**
     * Delete Category
     */
    delete(
        uuid: string
    ) {
        return axiosClient.delete(
            ENDPOINTS.categories.delete(uuid)
        );
    },

    /**
     * Restore Category
     */
    restore(
        uuid: string
    ) {
        return axiosClient.patch(
            ENDPOINTS.categories.restore(uuid)
        );
    },

    /**
     * Update Category Status
     */
    status(
        uuid: string,
        status: boolean
    ) {
        return axiosClient.patch(
            ENDPOINTS.categories.status(uuid),
            {
                status,
            }
        );
    },
};