import type { Table } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Settings2 } from "lucide-react";

interface Props<TData> {
    table: Table<TData>;
}

export default function DataTableColumnVisibility<TData>({
    table,
}: Props<TData>) {
    return (
        <DropdownMenu>

            <DropdownMenuTrigger className="inline-flex items-center rounded-md border px-4 py-2">
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            checked={column.getIsVisible()}
                            // onCheckedChange={(value) =>
                            //     column.toggleVisibility(!!value)
                            // }

                            onCheckedChange={(value) => {

                                column.toggleVisibility(!!value);
                            }}
                        >
                            {(column.columnDef.meta as any)?.title ??
                                column.id}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>

        </DropdownMenu>
    );
}