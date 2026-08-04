export interface User {
    uuid: string;
    first_name: string;
    last_name: string | null;
    email: string;
    mobile: string | null;
    country_code: string | null;
    avatar: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

/**
 * Create User
 */
export interface CreateUserPayload {
    first_name: string;
    last_name?: string;
    email: string;
    mobile?: string;
    country_code?: string;
    password: string;
    password_confirmation: string;
    role: string;
    is_active: boolean;
}

/**
 * Update User
 */
export interface UpdateUserPayload {
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile?: string;
    country_code?: string;
    password?: string;
    password_confirmation?: string;
    role?: string;
    is_active?: boolean;
}