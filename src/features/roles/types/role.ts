export interface Role {
    id: number;
    name: string;
    guard_name: string | null;
    display_name: string;
    description: string | null;
    is_system: boolean;
    created_at: string;
    updated_at: string;
}

export interface RoleListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
}