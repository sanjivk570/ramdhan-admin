export interface TaxRateTaxClass {
    uuid: string;
    name: string;
    code: string;
}

export interface TaxRate {
    uuid: string;
    tax_class_uuid: string;
    tax_class?: TaxRateTaxClass | null;
    name: string;
    rate: number | string;
    country_code: string | null;
    state_code: string | null;
    is_active: boolean;
    priority: number;
    created_at: string;
    updated_at: string;
}

export interface TaxRateListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

export interface CreateTaxRatePayload {
    name: string;
    rate: number;
    tax_class_uuid: string;
    country_code?: string;
    state_code?: string;
    priority: number;
    is_active: boolean;
}

export type UpdateTaxRatePayload = Partial<CreateTaxRatePayload>;
