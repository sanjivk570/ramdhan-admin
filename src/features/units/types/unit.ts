export interface Unit {
    uuid: string;

    name: string;

    code: string;

    symbol: string;

    decimal_places: number;

    is_active: boolean;

    sort_order: number;

    created_at: string;

    updated_at: string;
}

export interface UnitListParams {
    page?: number;

    per_page?: number;

    search?: string;

    sort_by?: string;

    sort_order?: "asc" | "desc";

    filters?: Record<string, unknown>;
}

export interface CreateUnitPayload {
    name: string;

    code: string;

    symbol: string;

    decimal_places: number;

    is_active: boolean;

    sort_order: number;
}

export interface UpdateUnitPayload {
    name?: string;

    code?: string;

    symbol?: string;

    decimal_places?: number;

    is_active?: boolean;

    sort_order?: number;
}