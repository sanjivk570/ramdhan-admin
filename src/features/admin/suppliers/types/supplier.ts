export interface Supplier {
    uuid: string;
    id?: number;
    company_name: string;
    contact_person?: string | null;
    email?: string | null;
    country_code?: string | null;
    mobile?: string | null;
    alternate_mobile?: string | null;
    website?: string | null;
    gstin?: string | null;
    pan?: string | null;
    payment_terms_days?: number | null;
    credit_limit?: number | null;
    notes?: string | null;
    is_active?: boolean;
    is_trash?: boolean;
    created_at: string;
    updated_at: string;
}

export interface SupplierListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        company_name?: string;
        status?: string;
    };
}

export interface CreateSupplierPayload {
    company_name: string;
    contact_person?: string;
    email?: string;
    country_code?: string;
    mobile?: string;
    alternate_mobile?: string;
    website?: string;
    gstin?: string;
    pan?: string;
    payment_terms_days?: number;
    credit_limit?: number;
    notes?: string;
    is_active?: boolean;
}