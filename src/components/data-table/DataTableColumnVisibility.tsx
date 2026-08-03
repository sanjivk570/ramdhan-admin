// import { Settings2 } from "lucide-react";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuCheckboxItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Button } from "@/components/ui/button";

// import type {
//     Table,
// } from "@tanstack/react-table";

// interface Props<TData> {

//     table: Table<TData>;

// }

// export default function DataTableColumnVisibility<TData>({

//     table,

// }: Props<TData>) {

//     return (

//         <DropdownMenu>

//             <DropdownMenuTrigger asChild>

//                 <Button variant="outline">

//                     <Settings2 className="mr-2 h-4 w-4"/>

//                     Columns

//                 </Button>

//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="end">

//                 {table

//                     .getAllLeafColumns()

//                     .filter(column => column.getCanHide())

//                     .map(column => (

//                         <DropdownMenuCheckboxItem

//                             key={column.id}

//                             checked={column.getIsVisible()}

//                             onCheckedChange={(value)=>

//                                 column.toggleVisibility(!!value)

//                             }

//                         >

//                             {column.id}

//                         </DropdownMenuCheckboxItem>

//                     ))}

//             </DropdownMenuContent>

//         </DropdownMenu>

//     );

// }

import type { Table } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

//import { Button } from "@/components/ui/button";

import { Settings2 } from "lucide-react";

interface Props<TData> {
    table: Table<TData>;
}

export default function DataTableColumnVisibility<TData>({
    table,
}: Props<TData>) {
    return (
        <DropdownMenu>

            {/* <DropdownMenuTrigger asChild>

                <Button variant="outline">

                    <Settings2 className="mr-2 h-4 w-4" />

                    Columns

                </Button>

            </DropdownMenuTrigger> */}
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
                                console.log(column.id, column.getIsVisible());

                                column.toggleVisibility(!!value);
                            }}
                        >
                            {column.columnDef.meta?.title ??
                                column.id}
                        </DropdownMenuCheckboxItem>
                    ))}
            </DropdownMenuContent>

        </DropdownMenu>
    );
}