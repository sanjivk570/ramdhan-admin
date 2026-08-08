export interface CsvColumn<T> {

    key: keyof T;

    title: string;

    value?: (
        row: T
    ) => string | number | boolean | null | undefined;

}

export function exportCsv<T>(

    filename: string,

    columns: CsvColumn<T>[],

    rows: T[]

) {

    const header = columns.map(col => col.title);

    const body = rows.map(row =>

        columns.map(col => {

            //const value = row[col.key];

            const value = col.value ? col.value(row) : row[col.key];

            return `"${String(value ?? "").replace(/"/g, '""')}"`;

        })

    );

    const csv = [

        header.join(","),

        ...body.map(r => r.join(","))

    ].join("\n");

    const blob = new Blob(

        [csv],

        {

            type: "text/csv;charset=utf-8;",

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${filename}.csv`;

    link.click();

    URL.revokeObjectURL(url);

}