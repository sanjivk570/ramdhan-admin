import type { CsvColumn } from "@/lib/csv";

import type { User } from "../types/user";

export const userExportColumns: CsvColumn<User>[] = [

    {

        key: "first_name",

        title: "First Name",

    },

    {

        key: "email",

        title: "Email",

    },

    {

        key: "mobile",

        title: "Mobile",

    },

    {

        key: "is_active",

        title: "Status",

    },

];