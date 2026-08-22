export interface CustomerAddress {
    uuid: string;
    address_type?: string;
    type?: string;
    first_name?: string;
    last_name?: string;
    company?: string | null;
    phone?: string | null;
    address_line_1?: string;
    address_line_2?: string | null;
    landmark?: string | null;
    city?: string;
    state?: string;
    state_code?: string | null;
    postal_code?: string;
    country?: string;
    country_code?: string | null;
    is_default?: boolean;
}

export interface Customer {
    uuid: string;
    id?: number;
    first_name: string;
    last_name?: string | null;
    email: string;
    country_code?: string | null;
    mobile?: string | null;
    is_active: boolean;
    addresses?: CustomerAddress[];
    created_at: string;
    updated_at: string;
}

export interface CustomerListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        first_name?: string;
        last_name?: string;
        email?: string;
        mobile?: string;
        status?: string;
    };
}

export interface CreateCustomerPayload {
    first_name: string;
    last_name?: string;
    email: string;
    country_code?: string;
    mobile?: string;
    password?: string;
    password_confirmation?: string;
    is_active: boolean;
}
