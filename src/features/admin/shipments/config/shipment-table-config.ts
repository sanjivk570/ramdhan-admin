import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getShipmentColumns,
    type ShipmentColumnActions,
} from "../columns/shipment-columns";
import { shipmentFilters } from "./filters";
import { shipmentExportColumns } from "./shipment-export-columns";
import type { Shipment } from "../types/shipment";

export function shipmentTableConfig(
    actions: ShipmentColumnActions
): DataTableConfig<Shipment> {
    return {
        title: "Shipments",
        storageKey: "shipments",
        searchPlaceholder: "Search shipments by tracking number or order...",
        columns: getShipmentColumns(actions),
        filters: shipmentFilters,
        exportColumns:
            shipmentExportColumns as unknown as ExportColumn<Shipment>[],
    };
}
