export interface OrderItem {
    uuid: string;
    product_uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Order {
    uuid: string;
    order_number: string;
    customer_name?: string;
    customer_email?: string;
    customer_mobile?: string;
    status: string;
    payment_status: string;
    fulfillment_status: string;
    currency: string;
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
    items?: OrderItem[];
    shipping_address?: Record<string, string> | null;
    created_at: string;
    updated_at: string;
}

export interface OrderListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    status?: string;
    payment_status?: string;
    fulfillment_status?: string;
}

export interface UpdateOrderStatusPayload {
    status: string;
}
