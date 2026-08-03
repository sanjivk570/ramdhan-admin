// //import { ArrowUpDown } from "lucide-react";
// import type { Column } from "@tanstack/react-table";

// import {
//     ArrowUp,
//     ArrowDown,
//     ArrowUpDown,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// interface Props<TData> {
//     column: Column<TData, unknown>;
//     title: string;
// }

// export default function SortableHeader<TData>({
//     column,
//     title,
// }: Props<TData>) {
//     return (
//         <Button
//             variant="ghost"
//             className="h-auto p-0 font-semibold hover:bg-transparent"
//             onClick={() =>
//                 column.toggleSorting(column.getIsSorted() === "asc")
//             }
//         >
//             {title}

//             <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//     );
// }

import type { Column } from "@tanstack/react-table";

import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props<TData> {
    column: Column<TData, unknown>;
    title: string;
}

export default function SortableHeader<TData>({
    column,
    title,
}: Props<TData>) {

    const sorted = column.getIsSorted();

    return (

        <Button

            variant="ghost"

            className="h-auto p-0 font-semibold hover:bg-transparent"

            onClick={() =>
                column.toggleSorting(sorted === "asc")
            }

        >

            {title}

            {sorted === "asc" ? (

                <ArrowUp className="ml-2 h-4 w-4" />

            ) : sorted === "desc" ? (

                <ArrowDown className="ml-2 h-4 w-4" />

            ) : (

                <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />

            )}

        </Button>

    );

}