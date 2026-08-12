export interface ProductCategory {
    id?: number;
    uuid: string;
    name: string;
    slug?: string;
}

export interface ProductUnit {
    id: number;
    uuid?: string;
    name: string;
    code: string;
    symbol: string;
    decimal_places: number;
}

export interface ProductTaxClass {
    id: number;
    uuid?: string;
    name: string;
    code: string;
    description?: string | null;
}

export interface ProductImage {
    uuid: string;
    original_name: string;
    file_name: string;
    url: string | null;
    path: string;
    mime_type: string;
    size: number;
    size_kb: number;
    title: string | null;
    alt_text: string | null;
    description: string | null;
    type: string;
    sort_order: number;
    is_primary: boolean;
    collection: string | null;
}

export interface ProductAttributeValue {
    uuid: string;
    value: string;
    slug: string;
    display_value: string | null;
    sort_order: number;
    is_active: boolean;
    attribute?: {
        uuid: string;
        name: string;
        type: string;
    };
}

export interface ProductVariant {
    uuid: string;
    product_id?: number;
    name: string;
    sku: string;
    price: number | string;
    compare_price: number | string | null;
    cost_price: number | string | null;
    // stock_quantity: number;
    // low_stock_threshold: number;
    inventory: ProductInventory | null;
    is_default: boolean;
    is_active: boolean;
    sort_order: number;
    attribute_values?: ProductAttributeValue[];
    created_at: string;
    updated_at: string;
}

export interface ProductInventory{
    uuid: string;
    reserved_quantity: number,
    available_quantity: number,
    quantity: number;
    low_stock_threshold: number;
}

export interface Product {
    uuid: string;
    name: string;
    slug: string;
    sku: string;
    unit_id: number | null;
    tax_class_id: number | null;
    description: string | null;
    short_description: string | null;
    price: number | string;
    compare_price: number | string | null;
    cost_price: number | string | null;
    // stock_quantity: number;
    // low_stock_threshold: number;
    inventory: ProductInventory | null;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    categories?: ProductCategory[];
    images?: ProductImage[];
    variants?: ProductVariant[];
    unit?: ProductUnit | null;
    tax_class?: ProductTaxClass | null;
    created_at: string;
    updated_at: string;
}

export interface ProductListParams {
    page?: number;
    per_page?: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

export interface CreateProductPayload {
    name: string;
    slug: string;
    sku: string;
    description?: string;
    short_description?: string;
    unit_id?: number;
    tax_class_id?: number;
    price: number;
    compare_price?: number;
    cost_price?: number;
    stock_quantity: number;
    low_stock_threshold: number;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    categories: string[];
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface ProductVariantPayload {
    name: string;
    sku: string;
    price: number;
    compare_price?: number;
    cost_price?: number;
    stock_quantity: number;
    low_stock_threshold: number;
    is_default: boolean;
    is_active: boolean;
    sort_order: number;
    attribute_values: string[];
}
