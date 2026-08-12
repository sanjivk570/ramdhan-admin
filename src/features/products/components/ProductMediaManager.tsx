import { MediaManager } from "@/features/media";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { ProductMedia } from "../types/product-media";

interface ProductMediaManagerProps {
    productUuid: string;
    media?: ProductMedia[] | null;
    disabled?: boolean;
}

export default function ProductMediaManager({
    productUuid,
    media = [],
    disabled = false,
}: ProductMediaManagerProps) {
    return (
        <MediaManager
            target={{
                mediableType: "product",
                mediableUuid: productUuid,
                collection: "product",
            }}
            media={media}
            title="Product Images"
            description="Manage product images, metadata and the primary catalog image."
            disabled={disabled}
            allowVideo={true}
            invalidateQueryKeys={[
                [QUERY_KEYS.PRODUCTS],
                [QUERY_KEYS.PRODUCTS, "details", productUuid],
            ]}
        />
    );
}
