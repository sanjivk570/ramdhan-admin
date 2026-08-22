export interface ShippingZone {
    uuid: string;
    id?: number;
    name: string;
    code?: string | null;
    description?: string | null;
    is_active?: boolean;
    sort_order?: number;
    created_at: string;
    updated_at: string;
}

export interface ShippingMethod {
    uuid: string;
    id?: number;
    name: string;
    code?: string | null;
    description?: string | null;
    is_active?: boolean;
    tracking_url?: string | null;
    sort_order?: number;
    created_at: string;
    updated_at: string;
}

export interface ShippingRate {
    uuid: string;
    id?: number;
    shipping_zone_id: number;
    shipping_method_id: number;
    name?: string;
    min_weight?: number;
    max_weight?: number;
    min_order_amount?: number;
    max_order_amount?: number | null;
    base_rate?: number;
    per_kg_rate?: number;
    free_shipping_threshold?: number | null;
    is_active?: boolean;
    sort_order?: number;
    zone?: { name: string };
    method?: { name: string };
    created_at: string;
    updated_at: string;
}

export interface ListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, string>;
}

export interface CreateZonePayload {
    name: string;
    code?: string;
    description?: string;
    is_active?: boolean;
    sort_order?: number;
}

export interface CreateMethodPayload {
    name: string;
    code?: string;
    description?: string;
    is_active?: boolean;
    tracking_url?: string;
    sort_order?: number;
}

export interface CreateRatePayload {
    shipping_zone_id: number;
    shipping_method_id: number;
    name?: string;
    min_weight?: number;
    max_weight?: number;
    min_order_amount?: number;
    max_order_amount?: number;
    base_rate?: number;
    per_kg_rate?: number;
    free_shipping_threshold?: number;
    is_active?: boolean;
    sort_order?: number;
}
