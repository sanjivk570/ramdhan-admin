import type { MediaItem } from "@/features/admin/media";

export type ProductMedia = MediaItem;

export interface ProductMediaTarget {
    mediableType: "product";
    // collection: "product-images";
    collection: "product";
}
