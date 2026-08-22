export interface CartItem {
    uuid: string;
    product_uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    unit_price: number;
    line_total: number;
}

export interface CartCustomer {
    id: number
    uuid: string;
    name: string;
    email: string;
}

export interface Cart {
    uuid: string;
    id: number;
    // customer_uuid?: string;
    // customer_name?: string;
    // customer_email?: string;
    status: string;
    currency_code: string;
    discount_amount: number;
    tax_amount: number;
    shipping_amount: number;
    subtotal: number;
    grand_total: number;
    customer?: CartCustomer;
    items?: CartItem[];
    created_at: string;
    updated_at: string;
}

export interface CartListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        customer_id?: string;
        status?: string;
        coupon_code?: string;
        min_total?: string;
        max_total?: string;
        from_date?: string;
        to_date?: string;
    };
}
