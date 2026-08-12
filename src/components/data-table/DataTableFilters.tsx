// import FilterText from "./FilterText";
// import FilterSelect from "./FilterSelect";
// import FilterDate from "./FilterDate";

// import type {
//     DataTableFilter,
// } from "./types";

// interface Props {

//     filters: DataTableFilter[];

//     values: Record<string, string>;

//     onChange: (
//         key: string,
//         value: string
//     ) => void;

// }

// export default function DataTableFilters({

//     filters,

//     values,

//     onChange,

// }: Props) {

//     if (!filters.length) {
//         return null;
//     }

//     return (

//         <div className="rounded-xl border bg-card shadow-sm">

//             {/* Header */}

//             <div className="flex items-center justify-between border-b px-5 py-3">

//                 <div>

//                     <h3 className="text-sm font-semibold">
//                         Filters
//                     </h3>

//                     <p className="text-xs text-muted-foreground">
//                         Refine the records using the filters below.
//                     </p>

//                 </div>

//                 <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">

//                     {filters.length} Filters

//                 </span>

//             </div>

//             {/* Body */}

//             <div className="grid grid-cols-1 gap-2 pt-2 pl-5 pr-5 sm:grid-cols-2 xl:grid-cols-4">

//                 {filters.map((filter) => {

//                     if (filter.type === "text") {

//                         return (

//                             <FilterText

//                                 key={filter.key}

//                                 label={filter.label}

//                                 value={
//                                     values[filter.key] ?? ""
//                                 }

//                                 placeholder={
//                                     filter.placeholder ??
//                                     `Search ${filter.label}`
//                                 }

//                                 onChange={(value) =>
//                                     onChange(
//                                         filter.key,
//                                         value
//                                     )
//                                 }

//                             />

//                         );

//                     }

//                     if (filter.type === "date") {

//                         return (

//                             <FilterDate

//                                 key={filter.key}

//                                 label={filter.label}

//                                 value={
//                                     values[filter.key] ?? ""
//                                 }

//                                 placeholder={
//                                     filter.placeholder
//                                 }

//                                 onChange={(value) =>

//                                     onChange(
//                                         filter.key,
//                                         value
//                                     )

//                                 }

//                             />

//                         );

//                     }

//                     return (

//                         <FilterSelect

//                             key={filter.key}

//                             label={filter.label}

//                             value={
//                                 values[filter.key] ?? ""
//                             }

//                             options={
//                                 filter.options ?? []
//                             }

//                             onChange={(value) =>
//                                 onChange(
//                                     filter.key,
//                                     value
//                                 )
//                             }

//                         />

//                     );

//                 })}

//             </div>

//         </div>

//     );


// }

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

import FilterText from "./FilterText";
import FilterSelect from "./FilterSelect";
import FilterDate from "./FilterDate";

import type { DataTableFilter } from "./types";

interface Props {
    filters: DataTableFilter[];

    values: Record<string, string>;

    onChange: (
        key: string,
        value: string
    ) => void;
}

export default function DataTableFilters({
    filters,
    values,
    onChange,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (!filters.length) {
        return null;
    }

    return (
        <div className="rounded-xl border bg-slate-100 shadow-sm  mb-3">
            {/* Header / Toggle */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-t-xl px-5 py-2 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <SlidersHorizontal className="h-4 w-4" />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">
                            Filters
                        </h3>

                        <p className="text-xs text-muted-foreground">
                            Refine the records using filters.
                        </p>
                    </div>

                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                        {filters.length}
                    </span>
                </div>

                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
            </button>

            {/* Filters */}
            {isOpen && (
                <div className="rounded-b-xl border-t bg-white px-5 pb-5 pt-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        {filters.map((filter) => {
                            if (filter.type === "text") {
                                return (
                                    <FilterText
                                        key={filter.key}
                                        label={filter.label}
                                        value={values[filter.key] ?? ""}
                                        placeholder={
                                            filter.placeholder ??
                                            `Search ${filter.label}`
                                        }
                                        onChange={(value) =>
                                            onChange(
                                                filter.key,
                                                value
                                            )
                                        }
                                    />
                                );
                            }

                            if (filter.type === "date") {
                                return (
                                    <FilterDate
                                        key={filter.key}
                                        label={filter.label}
                                        value={values[filter.key] ?? ""}
                                        placeholder={
                                            filter.placeholder
                                        }
                                        onChange={(value) =>
                                            onChange(
                                                filter.key,
                                                value
                                            )
                                        }
                                    />
                                );
                            }

                            return (
                                <FilterSelect
                                    key={filter.key}
                                    label={filter.label}
                                    value={values[filter.key] ?? ""}
                                    options={
                                        filter.options ?? []
                                    }
                                    onChange={(value) =>
                                        onChange(
                                            filter.key,
                                            value
                                        )
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}