export interface WishlistItem {
    uuid: string;
    product_uuid?: string;
    product_name?: string;
    sku?: string;
    price?: number;
    created_at: string;
}

export interface Wishlist {
    uuid: string;
    customer_uuid?: string;
    customer_name?: string;
    customer_email?: string;
    items?: WishlistItem[];
    created_at: string;
    updated_at: string;
}

export interface WishlistListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: {
        customer_id?: string;
        product_id?: string;
        from_date?: string;
        to_date?: string;
    };
}
