import { useEffect } from "react";
import type { ReactNode } from "react";
import { RotateCcw, RefreshCw } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps {

    search: string;

    setSearch: (value: string) => void;

    resetFilters: () => void;

    onRefresh?: () => void;

    children?: ReactNode;
}

export function DataTableToolbar({

    search,

    setSearch,

    resetFilters,

    onRefresh,

    children,

}: DataTableToolbarProps) {

    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {

        setSearch(debouncedSearch);

    }, [debouncedSearch]);

    return (

        <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-2">

                <Input
                    placeholder="Search..."
                    className="w-72"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <Button
                    variant="outline"
                    onClick={resetFilters}
                >
                    <RotateCcw className="mr-2 h-4 w-4" />

                    Reset

                </Button>

                <Button
                    variant="outline"
                    onClick={onRefresh}
                >
                    <RefreshCw className="mr-2 h-4 w-4" />

                    Refresh

                </Button>

            </div>

            {children}

        </div>

    );

}