// import { useMemo, useState } from "react";
// import { useDebounce } from "use-debounce";

// import type {PaginationState, SortingState,} from "@tanstack/react-table";


// export function useDataTable() {
    
//     const setFilter = (key: string, value: string) => {
//         setPagination((prev) => ({
//             ...prev,
//             pageIndex: 0,
//         }));

//         setFilters((prev) => ({
//             ...prev,
//             [key]: value,
//         }));
//     };

//     const [pagination, setPagination] =
//         useState<PaginationState>({
//             pageIndex: 0,
//             pageSize: 10,
//         });

//     const [sorting, setSorting] =
//         useState<SortingState>([]);

//     // const [search, setSearch] = useState("");
//     const [search, setSearch] = useState("");
//     const [debouncedSearch] = useDebounce(
//         search,
//         500
//     );

//     const [filters, setFilters] =
//         useState<Record<string, unknown>>({});
        

//     const query = useMemo(() => {

//         const sort = sorting[0];

//         return {

//             page: pagination.pageIndex + 1,

//             per_page: pagination.pageSize,

//             //search,
//             //debouncedSearch,
//             search: debouncedSearch,

//             sort_by: sort?.id,

//             sort_order: sort?.desc
//                 ? "desc"
//                 : "asc",

//             filters,

//         };

//     }, [
//         pagination,
//         sorting,
//         //search,
//         debouncedSearch,
//         filters,
//     ]);

//     function resetFilters() {

//         setSearch("");

//         setFilters({});

//         setSorting([]);

//         setPagination({

//             pageIndex: 0,

//             pageSize: 10,

//         });

//     }

//     return {

//         query,

//         debouncedSearch,

//         setSearch,

//         filters,

//         setFilters,

//         setFilter,

//         sorting,

//         setSorting,

//         pagination,

//         setPagination,

//         resetFilters,

//     };

// }

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import type {
    PaginationState,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table";

import type {
    DataTableState,
} from "@/components/data-table";

import { getStorage, setStorage } from "@/lib/storage";

interface Options {
    storageKey?: string;
}

export function useDataTable({

    storageKey = "datatable",

}: Options = {}) {

    const defaultState: DataTableState = {

        search: "",

        filters: {},

        sorting: [],

        pageSize: 10,

        visibility: {},

    };

    
    // const [pagination, setPagination] = useState<PaginationState>({
    //     pageIndex: 0,
    //     pageSize: 10,
    // });


    const persistedState = getStorage<DataTableState>(
        `${storageKey}-table-state`,
        defaultState
    );

    const [pagination, setPagination] =
    useState<PaginationState>({
        pageIndex: 0,
        pageSize: persistedState.pageSize,
    });
    

    //const [sorting, setSorting] = useState<SortingState>([]);
    const [sorting, setSorting] =
    useState<SortingState>(
        persistedState.sorting
    );

    //const [search, setSearch] = useState("");

    const [search, setSearch] =
    useState(
        persistedState.search
    );

    const [debouncedSearch] = useDebounce(search, 500);

    //const [filters, setFilters] = useState<Record<string, unknown>>({});

    const [filters, setFilters] =
    useState<Record<string, unknown>>(
        persistedState.filters
    );

    const [debouncedFilters] = useDebounce(filters, 500);

    const [visibility, setVisibility] =
    useState<VisibilityState>(
        persistedState.visibility
    );

    // const [visibility, setVisibility] =
    // useState<VisibilityState>({});
    // const STORAGE_KEY = `${storageKey}-visibility`;
    // const [visibility, setVisibility] =
    //     useState<VisibilityState>(() =>
    //         getStorage(
    //             STORAGE_KEY,
    //             {}
    //         )
    //     );
    // useEffect(() => {
    //     setStorage(
    //         STORAGE_KEY,
    //         visibility
    //     );
    // }, [
    //     visibility,
    // ]);

    

    const setFilter = (key: string, value: string) => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: 0,
        }));

        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const query = useMemo(() => {
        const sort = sorting[0];

        return {
            page: pagination.pageIndex + 1,
            per_page: pagination.pageSize,
            search: debouncedSearch,
            sort_by: sort?.id,
            sort_order: sort?.desc ? "desc" : "asc",

            // Debounced filters
            filters: debouncedFilters,
        };
    }, [
        pagination,
        sorting,
        debouncedSearch,
        debouncedFilters,
    ]);

    useEffect(() => {

        setStorage(

            `${storageKey}-table-state`,

            {

                search,

                filters,

                sorting,

                pageSize:
                    pagination.pageSize,

                visibility,

            }

        );

    }, [

        search,

        filters,

        sorting,

        pagination.pageSize,

        visibility,

        storageKey,

    ]);

    function resetFilters() {
        setSearch("");
        setFilters({});
        setSorting([]);
        setVisibility({});
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });
    }

    return {
        query,
        debouncedSearch,
        debouncedFilters,
        setSearch,
        filters,
        setFilters,
        setFilter,
        sorting,
        setSorting,
        pagination,
        setPagination,
        resetFilters,
        visibility,
        setVisibility,
    };
}