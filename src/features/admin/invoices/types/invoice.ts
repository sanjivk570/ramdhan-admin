export interface InvoiceItem {
    uuid: string;
    product_uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
    unit_price: number;
    tax_amount?: number;
    line_total: number;
}

export interface Invoice {
    uuid: string;
    invoice_number: string;
    order_uuid?: string;
    order_number?: string;
    customer_name?: string;
    customer_email?: string;
    status: string;
    currency: string;
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
    items?: InvoiceItem[];
    invoice_date?: string;
    due_date?: string;
    created_at: string;
    updated_at: string;
}

export interface InvoiceListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    status?: string;
}

export interface GenerateInvoicePayload {
    order_uuid: string;
}
