/*
 * Purchase back-office entities:
 * Orders -> Goods Receipts -> Invoices -> Payments (+ Returns)
 */

export interface PurchaseDocumentItem {
    uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    unit_price?: number;
    unit_cost?: number;
    line_total?: number;
    reason?: string | null;
}

export interface PurchaseOrder {
    uuid: string;
    po_number?: string;
    supplier_name?: string;
    supplier_id?: number;
    /** draft | submitted | approved | cancelled */
    status: string;
    currency_code: string;
    order_date?: string | null;
    expected_date?: string | null;
    subtotal?: number;
    tax_amount?: number;
    shipping_amount?: number;
    grand_total?: number;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface PurchaseOrderListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        status?: string;
        supplier_id?: string;
        from_date?: string;
        to_date?: string;
    };
}

export interface GoodsReceipt {
    uuid: string;
    grn_number?: string;
    purchase_order_uuid?: string;
    supplier_name?: string;
    supplier_id?: number;
    /** draft | posted | void */
    status: string;
    currency_code: string;
    receipt_date?: string | null;
    items?: PurchaseDocumentItem[];
    created_at: string;
    updated_at: string;
}

export interface GoodsReceiptListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        status?: string;
        supplier_id?: string;
        purchase_order_id?: string;
    };
}

export interface PurchaseInvoice {
    uuid: string;
    supplier_invoice_number?: string;
    supplier_name?: string;
    supplier_id?: number;
    /** draft | posted */
    status: string;
    currency_code: string;
    invoice_date?: string | null;
    due_date?: string | null;
    grand_total?: number;
    created_at: string;
    updated_at: string;
}

export interface PurchaseInvoiceListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        status?: string;
        supplier_id?: string;
        from_date?: string;
        to_date?: string;
    };
}

export interface PurchasePayment {
    uuid: string;
    reference_number?: string;
    supplier_name?: string;
    supplier_id?: number;
    currency_code: string;
    amount: number;
    payment_method: string;
    payment_date?: string | null;
    bank_account?: string | null;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export interface PurchasePaymentListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        payment_method?: string;
        supplier_id?: string;
        invoice_uuid?: string;
    };
}

export interface PurchaseReturn {
    uuid: string;
    return_number?: string;
    supplier_name?: string;
    supplier_id?: number;
    /** draft | posted */
    status: string;
    currency_code: string;
    return_date?: string | null;
    reason?: string | null;
    grand_total?: number;
    created_at: string;
    updated_at: string;
}

export interface PurchaseReturnListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        status?: string;
        supplier_id?: string;
    };
}
