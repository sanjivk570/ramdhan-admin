import { X } from "lucide-react";
import type { SortingState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { DataTableFilter, } from "./types";

interface Props {
    search: string;
    filters: Record<string, unknown>;
    sorting: SortingState;
    filterConfig: DataTableFilter[];
    onSearchClear: () => void;
    onFilterRemove: (key: string) => void;
    onSortClear: () => void;
    onClearAll: () => void;
}

export default function DataTableActiveFilters({
    search,
    filters,
    sorting,
    filterConfig,
    onSearchClear,
    onFilterRemove,
    onSortClear,
    onClearAll,
}: Props) {

    const activeFilters = Object.entries(filters).filter(
        ([, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
    );

    const getFilterValue = (
        key: string,
        value: unknown
    ) => {

        const filter = filterConfig.find(

            (item) => item.key === key

        );

        if (!filter) {

            return String(value);

        }

        if (filter.type === "select") {

            return (

                filter.options?.find(

                    (option) =>

                        option.value === String(value)

                )?.label ?? String(value)

            );

        }

        if (

            (filter as { type: string }).type === "date" &&

            value

        ) {

            return new Date(

                String(value)

            ).toLocaleDateString();

        }

        return String(value);

    };

    // if (!search && activeFilters.length === 0) {
    //     return null;
    // }

    if (!search && activeFilters.length === 0 && sorting.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-slate-100 p-3">

            {search && (
                <Button
                    className="bg-slate-400"
                    variant="secondary"
                    size="sm"
                    onClick={onSearchClear}
                >
                    Search : <span className="font-bold">{search}</span>

                    <X className="ml-2 h-3 w-3" />
                </Button>
            )}

            {activeFilters.map(([key, value]) => {

                const filter = filterConfig.find(

                    (item) => item.key === key

                );

                return (

                    <Button

                        key={key}

                        variant="secondary"

                        className="bg-slate-400"

                        size="sm"

                        onClick={() =>

                            onFilterRemove(key)

                        }

                    >

                        {filter?.label ?? key}

                        {" : "}

                        <span className="font-bold">
                            {getFilterValue(

                                key,

                                value

                            )}
                        </span>

                        <X className="ml-2 h-3 w-3" />

                    </Button>

                );

            })}

            {sorting.length > 0 && (
                <Button
                    variant="secondary"
                    className="bg-slate-400"
                    size="sm"
                    onClick={onSortClear}
                >
                    Sort : 
                    <span className="font-bold">
                        {" "} {sorting[0].id} {" "}
                        (
                        {sorting[0].desc ? "DESC"
                            : "ASC"}
                        )
                    </span>
                    <X className="ml-2 h-3 w-3" />

                </Button>
            )}

            <Button
                variant="ghost"
                size="sm"
                className="ml-auto bg-slate-400"
                onClick={onClearAll}
            >
                Clear All
            </Button>

        </div>
    );
}