export interface RolePermissions {
    id: number;
    name: string;
    display_name: string;
    module: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string | null;
    display_name: string;
    description: string | null;
    is_system: boolean;
    permissions?: RolePermissions | null;
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

export interface CreateRolePayload {
    name: string;
    display_name: string;
    description?: string;
    guard_name: string;
    is_system: boolean;
}

export interface UpdateRolePayload {
    name?: string;
    display_name?: string;
    description?: string;
    guard_name?: string;
    is_system?: boolean;
}

export interface RoleDetails {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
    guard_name: string;
    is_system: boolean;
    created_at: string;
    updated_at?: string;
}

export interface UpdateRolePermissionsPayload {
    permissions: string[];
}