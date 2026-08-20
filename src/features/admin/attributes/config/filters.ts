import type { DataTableFilter } from "@/components/data-table";
export const attributeFilters: DataTableFilter[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "slug", label: "Slug", type: "text" },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "Select", value: "select" },
      { label: "Color", value: "color" },
      { label: "Text", value: "text" },
      { label: "Number", value: "number" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "1" },
      { label: "Inactive", value: "0" },
    ],
  },
];
