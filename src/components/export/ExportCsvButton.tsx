import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import {

    exportCsv,

    type CsvColumn,

} from "@/lib/csv";

interface Props<T> {

    filename: string;

    columns: CsvColumn<T>[];

    rows: T[];

}

export default function ExportCsvButton<T>({

    filename,

    columns,

    rows,

}: Props<T>) {

    return (

        <Button

            variant="outline"

            onClick={() =>

                exportCsv(

                    filename,

                    columns,

                    rows

                )

            }

        >

            <Download className="mr-2 h-4 w-4" />

            Export CSV

        </Button>

    );

}