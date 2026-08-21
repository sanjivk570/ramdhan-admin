export interface PaymentTransaction {
    uuid: string;
    order_uuid?: string;
    order_number?: string;
    customer_name?: string;
    customer_email?: string;
    amount: number;
    currency: string;
    payment_method: string;
    payment_status: string;
    transaction_id?: string;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface PaymentListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
}

export interface RefundPayload {
    amount?: number;
    reason?: string;
}
