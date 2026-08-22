export interface ShipmentItem {
    uuid?: string;
    order_item_uuid?: string;
    product_name?: string;
    sku?: string;
    quantity: number;
}

export interface Shipment {
    uuid: string;
    order_uuid?: string;
    order_number?: string;
    carrier?: string;
    service?: string;
    tracking_number?: string;
    tracking_url?: string;
    status: string;
    shipped_at?: string | null;
    items?: ShipmentItem[];
    created_at: string;
    updated_at: string;
}

export interface ShipmentListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        status?: string;
        carrier?: string;
        order_id?: string;
        customer_id?: string;
        shipped_from?: string;
        shipped_to?: string;
        from_date?: string;
        to_date?: string;
    };
}

export interface CreateShipmentPayload {
    order_uuid: string;
    carrier: string;
    service?: string;
    tracking_number?: string;
    tracking_url?: string;
    items?: {
        order_item_uuid: string;
        quantity: number;
    }[];
}
