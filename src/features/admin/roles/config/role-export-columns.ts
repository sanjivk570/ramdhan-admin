import type { CsvColumn } from "@/lib/csv";

import type { Role } from "../types/./role.ts";

export const roleExportColumns: CsvColumn<Role>[] = [
    {
        key: "id",
        title: "ID",
    },
    {
        key: "name",
        title: "Name",
    },
    {
        key: "guard_name",
        title: "Guard Name",
    },
    {
        key: "description",
        title: "Description",
    },
    {
        key: "is_system",
        title: "System",
    },
];