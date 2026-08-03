import FilterText from "./FilterText";
import FilterSelect from "./FilterSelect";

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

    return (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

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

    );

}