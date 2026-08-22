export interface Address {
    uuid: string;
    id?: number;
    address_type?: string;
    type?: "shipping" | "billing";
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
    created_at: string;
    updated_at: string;
}

export interface AddressListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        type?: string;
        address_type?: string;
    };
}

export interface CreateAddressPayload {
    address_type?: string;
    type: "shipping" | "billing";
    first_name: string;
    last_name?: string;
    company?: string;
    phone?: string;
    address_line_1: string;
    address_line_2?: string;
    landmark?: string;
    city: string;
    state: string;
    state_code?: string;
    postal_code: string;
    country: string;
    country_code?: string;
    is_default?: boolean;
}
