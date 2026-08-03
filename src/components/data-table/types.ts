import type {
    ColumnDef,
    PaginationState,
    SortingState,
    VisibilityState,
    Updater,
} from "@tanstack/react-table";

// export interface DataTableMeta {
//     current_page: number;
//     per_page: number;
//     total: number;
//     last_page: number;
// }

export interface DataTableMeta {
    current_page: number;
    from: number;
    to: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface DataTableQuery {
    page: number;
    per_page: number;
    search?: string;
    sort_by?: string;
    sort_order?: "asc" | "desc";
    filters?: Record<string, unknown>;
}

export interface DataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];

    loading?: boolean;

    pagination: PaginationState;

    pageCount: number;

    sorting: SortingState;

    onPaginationChange: (
        pagination: PaginationState
    ) => void;

    onSortingChange: (
       sorting: SortingState
    ) => void;
    emptyState?:{

        title?:string;

        description?:string;

        actionLabel?:string;

        onAction?:()=>void;

    };
    visibility: VisibilityState;

    onVisibilityChange: (
        //state: VisibilityState
        updater: Updater<VisibilityState>
    ) => void;
}

export interface FilterOption {
    label: string;
    value: string;
}

export interface DataTableFilter {

    key: string;

    label: string;

    type: "text" | "select";

    placeholder?: string;

    options?: FilterOption[];

}

export interface DataTableState {

    search: string;

    filters: Record<string, unknown>;

    sorting: SortingState;

    pageSize: number;

    visibility: VisibilityState;

}