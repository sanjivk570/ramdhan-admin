export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    meta: PaginationMeta;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors: unknown;
    meta: unknown;
}