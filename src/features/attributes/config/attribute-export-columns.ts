import type { CsvColumn } from "@/lib/csv";
import type { Attribute } from "../types/attribute";
export const attributeExportColumns: CsvColumn<Attribute>[] = [
  { key: "name", title: "Name" },
  { key: "slug", title: "Slug" },
  { key: "type", title: "Type" },
  { key: "sort_order", title: "Sort Order" },
  { key: "is_active", title: "Status" },
];
