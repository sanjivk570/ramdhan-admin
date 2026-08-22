import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getShippingZoneColumns,
    type ShippingZoneColumnActions,
} from "../columns/shipping-zone-columns";
import { shippingZoneExportColumns } from "../columns/shipping-zone-export-columns";
import type { ShippingZone } from "../types/shipping";
import { shippingZoneFilters } from "./filters";

export function shippingZoneTableConfig(
    actions: ShippingZoneColumnActions
): DataTableConfig<ShippingZone> {
    return {
        title: "Shipping Zones",
        storageKey: "shipping-zones",
        searchPlaceholder: "Search shipping zones by name...",
        columns: getShippingZoneColumns(actions),
        filters: shippingZoneFilters,
        exportColumns:
            shippingZoneExportColumns as unknown as ExportColumn<ShippingZone>[],
    };
}
