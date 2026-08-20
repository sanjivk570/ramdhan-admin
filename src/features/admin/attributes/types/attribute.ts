export interface AttributeValue {
  uuid: string;
  value: string;
  slug: string;
  display_value: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
export interface Attribute {
  uuid: string;
  name: string;
  slug: string;
  type: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  values?: AttributeValue[];
}
export interface AttributeListParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  filters?: Record<string, unknown>;
}
export interface CreateAttributePayload {
  name: string;
  slug: string;
  type: string;
  sort_order: number;
  is_active: boolean;
}
export type UpdateAttributePayload = Partial<CreateAttributePayload>;
export interface CreateAttributeValuePayload {
  value: string;
  slug: string;
  display_value?: string;
  sort_order: number;
  is_active: boolean;
}
