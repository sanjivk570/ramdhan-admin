export interface ReturnItem {
    uuid: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    amount: number;
}

export interface ReturnRequest {
    uuid: string;
    return_number: string;
    order_number?: string;
    order_uuid?: string;
    customer_name?: string;
    customer_email?: string;
    status: string;
    reason?: string;
    admin_note?: string | null;
    refund_amount?: number;
    items?: ReturnItem[];
    created_at: string;
    updated_at: string;
}

export interface ReturnListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    status?: string;
}

export interface ProcessReturnPayload {
    action: "approve" | "reject";
    admin_note?: string;
}
