import FilterText from "./FilterText";
import FilterSelect from "./FilterSelect";
import FilterDate from "./FilterDate";

import type {
    DataTableFilter,
} from "./types";

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

    if (!filters.length) {
        return null;
    }

    // return (

    //     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

    //         {filters.map((filter) => {

    //             if (filter.type === "text") {

    //                 return (

    //                     <FilterText

    //                         key={filter.key}

    //                         label={filter.label}

    //                         value={
    //                             values[filter.key] ?? ""
    //                         }

    //                         placeholder={
    //                             filter.placeholder
    //                         }

    //                         onChange={(value) =>
    //                             onChange(
    //                                 filter.key,
    //                                 value
    //                             )
    //                         }

    //                     />

    //                 );

    //             }

    //             return (

    //                 <FilterSelect

    //                     key={filter.key}

    //                     label={filter.label}

    //                     value={
    //                         values[filter.key] ?? ""
    //                     }

    //                     options={
    //                         filter.options ?? []
    //                     }

    //                     onChange={(value) =>
    //                         onChange(
    //                             filter.key,
    //                             value
    //                         )
    //                     }

    //                 />

    //             );

    //         })}

    //     </div>

    // );

    return (

        <div className="rounded-xl border bg-card shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between border-b px-5 py-3">

                <div>

                    <h3 className="text-sm font-semibold">
                        Filters
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        Refine the records using the filters below.
                    </p>

                </div>

                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">

                    {filters.length} Filters

                </span>

            </div>

            {/* Body */}

            <div className="grid grid-cols-1 gap-2 pt-2 pl-5 pr-5 sm:grid-cols-2 xl:grid-cols-4">

                {filters.map((filter) => {

                    if (filter.type === "text") {

                        return (

                            <FilterText

                                key={filter.key}

                                label={filter.label}

                                value={
                                    values[filter.key] ?? ""
                                }

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

                                value={
                                    values[filter.key] ?? ""
                                }

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

                            value={
                                values[filter.key] ?? ""
                            }

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

    );


}