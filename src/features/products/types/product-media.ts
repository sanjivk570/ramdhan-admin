import type { MediaItem } from "@/features/media";

export type ProductMedia = MediaItem;

export interface ProductMediaTarget {
    mediableType: "product";
    // collection: "product-images";
    collection: "product";
}
