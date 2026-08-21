export interface Coupon {
    uuid: string;
    code: string;
    name: string;
    discount_type: "percentage" | "fixed" | string;
    discount_value: number;
    maximum_discount: number | null;
    minimum_order_amount: number;
    usage_limit: number | null;
    per_customer_limit: number;
    used_count?: number;
    starts_at: string | null;
    ends_at: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CouponListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    status?: string;
}

export interface CreateCouponPayload {
    code: string;
    name: string;
    discount_type: string;
    discount_value: number;
    maximum_discount?: number;
    minimum_order_amount?: number;
    usage_limit?: number;
    per_customer_limit?: number;
    starts_at?: string;
    ends_at?: string;
    is_active: boolean;
}

export interface UpdateCouponPayload {
    code?: string;
    name?: string;
    discount_type?: string;
    discount_value?: number;
    maximum_discount?: number;
    minimum_order_amount?: number;
    usage_limit?: number;
    per_customer_limit?: number;
    starts_at?: string;
    ends_at?: string;
    is_active?: boolean;
}
