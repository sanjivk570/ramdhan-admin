import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getShippingMethodColumns,
    type ShippingMethodColumnActions,
} from "../columns/shipping-method-columns";
import { shippingMethodExportColumns } from "../columns/shipping-method-export-columns";
import type { ShippingMethod } from "../types/shipping";
import { shippingMethodFilters } from "./method-filters";

export function shippingMethodTableConfig(
    actions: ShippingMethodColumnActions
): DataTableConfig<ShippingMethod> {
    return {
        title: "Shipping Methods",
        storageKey: "shipping-methods",
        searchPlaceholder: "Search shipping methods by name...",
        columns: getShippingMethodColumns(actions),
        filters: shippingMethodFilters,
        exportColumns:
            shippingMethodExportColumns as unknown as ExportColumn<ShippingMethod>[],
    };
}
