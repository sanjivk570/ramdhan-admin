export interface TaxClass {
    uuid: string;
    name: string;
    code: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface TaxClassListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

export interface CreateTaxClassPayload {
    name: string;
    code: string;
    description?: string;
    is_active: boolean;
    sort_order?: number;
}

export type UpdateTaxClassPayload = Partial<CreateTaxClassPayload>;
