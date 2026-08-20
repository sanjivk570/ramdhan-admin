import type { CsvColumn } from "@/lib/csv";

import type { Unit } from "../types/unit";

export const unitExportColumns: CsvColumn<Unit>[] = [
  {
    key: "name",

    title: "Name",
  },

  {
    key: "code",

    title: "Code",
  },

  {
    key: "symbol",

    title: "Symbol",
  },

  {
    key: "decimal_places",

    title: "Decimal Places",
  },

  {
    key: "sort_order",

    title: "Sort Order",
  },

  {
    key: "is_active",

    title: "Status",
  },
];
