import type {
    DataTableConfig,
    ExportColumn,
} from "@/components/data-table";

import {
    getAddressColumns,
    type AddressColumnActions,
} from "../columns/address-columns";
import { addressExportColumns } from "../columns/address-export-columns";
import type { Address } from "../types/address";
import { addressFilters } from "./filters";

export function addressTableConfig(
    actions: AddressColumnActions
): DataTableConfig<Address> {
    return {
        title: "Addresses",
        storageKey: "addresses",
        searchPlaceholder: "Search addresses...",
        columns: getAddressColumns(actions),
        filters: addressFilters,
        exportColumns:
            addressExportColumns as unknown as ExportColumn<Address>[],
    };
}
