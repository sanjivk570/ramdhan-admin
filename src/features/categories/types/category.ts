export interface Category {
    id?: number;
    uuid: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    parent_id: number | null;
    parent_name: string | null;
    is_active: boolean;
    sort_order: number;
    parent?: {
        id: number;
        uuid?: string;
        name: string;
    } | null;
    created_at: string;
    updated_at: string;
}

export interface CategoryListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        name?: string;
        status?: string | number;
        parent_id?: string | number;
    };
}

/**
 * Create Category
 */
export interface CreateCategoryPayload {
    name: string;
    //slug: string;
    description?: string;
    parent_id?: number | null;
    is_active: boolean;
    sort_order?: number;
    image?: string | null;
}

/**
 * Update Category
 */
export interface UpdateCategoryPayload {
    name?: string;
    description?: string;
    parent_id?: number | null;
    is_active?: boolean;
    sort_order?: number;
    image?: string | null;
}