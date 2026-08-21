export interface CartItem {
    uuid: string;
    product_uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    unit_price: number;
    line_total: number;
}

export interface Cart {
    uuid: string;
    customer_uuid?: string;
    customer_name?: string;
    customer_email?: string;
    status: string;
    currency: string;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
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
    status?: string;
    customer_id?: string;
}
