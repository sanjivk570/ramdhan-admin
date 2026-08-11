import type { DataTableFilter } from "@/components/data-table";

export const inventoryFilters: DataTableFilter[] = [
  {
    key: "is_active",

    label: "Status",

    type: "select",

    options: [
      {
        label: "Active",
        value: "1",
      },

      {
        label: "Inactive",
        value: "0",
      },
    ],
  },
];
