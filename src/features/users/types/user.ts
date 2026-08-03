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
}