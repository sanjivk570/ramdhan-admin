export interface PaymentTransaction {
    uuid: string;
    order_uuid?: string;
    order_number?: string;
    customer_name?: string;
    customer_email?: string;
    amount: number;
    currency?: string;
    /** Payment gateway provider e.g. razorpay, cod */
    provider?: string;
    /** success | pending | failed | refunded */
    status?: string;
    /** payment | refund */
    transaction_type?: string;
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
    filters?: {
        status?: string;
        provider?: string;
        transaction_type?: string;
        order_id?: string;
        min_amount?: string;
        max_amount?: string;
        from_date?: string;
        to_date?: string;
    };
}

export interface RefundPayload {
    amount?: number;
    reason?: string;
}
