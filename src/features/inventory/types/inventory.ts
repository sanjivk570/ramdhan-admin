export type InventoryTransactionType =
  | "purchase"
  | "return"
  | "sale"
  | "damage"
  | "cancellation"
  | "adjustment"
  | string;

export interface InventoryProduct {
  uuid: string;
  name: string;
  sku?: string | null;
}

export interface InventoryVariant {
  uuid: string;
  name: string;
  sku?: string | null;
}

export interface InventoryStock {
  uuid: string;

  product_id: number;
  product_variant_id: number | null;

  quantity: number;
  reserved_quantity: number;
  low_stock_threshold: number;

  is_active: boolean;

  product?: InventoryProduct | null;

  product_variant?: InventoryVariant | null;

  created_at: string;
  updated_at: string;
}

export interface InventoryListParams {
  page?: number;
  per_page?: number;

  search?: string;

  is_active?: number | boolean;

  sort_by?: string;

  sort_order?: "asc" | "desc";

  filters?: Record<string, unknown>;
}

export interface StockInPayload {
  quantity: number;

  type: "purchase" | "return" | string;

  reference_type?: string;

  reference_id?: string;

  notes?: string;
}

export interface StockOutPayload {
  quantity: number;

  type: "sale" | "damage" | "cancellation" | string;

  reference_type?: string;

  reference_id?: string;

  notes?: string;
}

export interface InventoryAdjustmentPayload {
  quantity: number;

  notes?: string;
}

export interface InventoryTransaction {
  uuid: string;

  inventory_stock_id: number;

  product_id: number;

  product_variant_id: number | null;

  type: InventoryTransactionType;

  quantity: number;

  quantity_before: number;

  quantity_after: number;

  reference_type?: string | null;

  reference_id?: string | null;

  notes?: string | null;

  created_by?: number | null;

  created_at: string;

  updated_at: string;

  product?: InventoryProduct | null;

  product_variant?: InventoryVariant | null;
}

export interface InventoryTransactionParams {
  page?: number;

  per_page?: number;

  search?: string;

  type?: string;

  sort_by?: string;

  sort_order?: "asc" | "desc";
}
