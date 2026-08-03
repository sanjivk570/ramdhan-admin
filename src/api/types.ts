export interface ListParams {
    page?: number;
    per_page?: number;

    search?: string;

    sort_by?: string;

    sort_order?: "asc" | "desc";
}