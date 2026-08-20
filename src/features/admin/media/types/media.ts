export type MediaType =
    | "image"
    | "video"
    | "audio"
    | "document"
    | "other";

export interface MediaItem {
    uuid: string;
    original_name: string;
    file_name: string;
    url: string | null;
    path: string;
    disk: string;
    mime_type: string;
    size: number;
    size_kb?: number;
    title: string | null;
    alt_text: string | null;
    description: string | null;
    type: MediaType;
    sort_order: number;
    is_primary: boolean;
    mediable_type: string;
    mediable_id: number;
    collection: string;
    created_at: string;
    updated_at: string;
}

export interface UploadMediaPayload {
    file: File;
    title?: string;
    alt_text?: string;
    description?: string;
    sort_order?: number;
    is_primary?: boolean;
}

export interface UpdateMediaPayload {
    title?: string | null;
    alt_text?: string | null;
    description?: string | null;
    sort_order?: number;
    is_primary?: boolean;
}

export interface MediaTarget {
    mediableType: string;
    mediableUuid: string;
    collection: string;
}
