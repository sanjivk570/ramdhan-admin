import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getShippingRateColumns,
    type ShippingRateColumnActions,
} from "../columns/shipping-rate-columns";
import { shippingRateExportColumns } from "../columns/shipping-rate-export-columns";
import type { ShippingRate } from "../types/shipping";
import { shippingRateFilters } from "./rate-filters";

export function shippingRateTableConfig(
    actions: ShippingRateColumnActions
): DataTableConfig<ShippingRate> {
    return {
        title: "Shipping Rates",
        storageKey: "shipping-rates",
        searchPlaceholder: "Search shipping rates...",
        columns: getShippingRateColumns(actions),
        filters: shippingRateFilters,
        exportColumns:
            shippingRateExportColumns as unknown as ExportColumn<ShippingRate>[],
    };
}
