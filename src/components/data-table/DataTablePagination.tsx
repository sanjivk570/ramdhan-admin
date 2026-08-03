import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { DataTableMeta } from "./types";

interface Props {

    meta?: DataTableMeta;

    pageIndex: number;

    pageSize: number;

    onPageChange: (page: number) => void;

    onPageSizeChange: (
        pageSize: number
    ) => void;

}

export default function DataTablePagination({

    meta,

    pageIndex,

    pageSize,

    onPageChange,

    onPageSizeChange,

}: Props) {

    if (!meta) {

        return null;

    }

    return (

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

            <div>

                Showing

                <strong> {meta.from} </strong>

                -

                <strong> {meta.to} </strong>

                of

                <strong> {meta.total} </strong>

            </div>

            <div className="flex items-center gap-3">

                <select

                    value={pageSize}

                    onChange={(e) =>
                        onPageSizeChange(
                            Number(e.target.value)
                        )
                    }

                    className="rounded border p-2"

                >

                    <option value={10}>10</option>

                    <option value={25}>25</option>

                    <option value={50}>50</option>

                    <option value={100}>100</option>

                </select>

                <Button

                    variant="outline"

                    size="icon"

                    disabled={
                        meta.current_page === 1
                    }

                    onClick={() =>
                        onPageChange(0)
                    }

                >

                    <ChevronsLeft
                        className="h-4 w-4"
                    />

                </Button>

                <Button

                    variant="outline"

                    size="icon"

                    disabled={
                        meta.current_page === 1
                    }

                    onClick={() =>
                        onPageChange(pageIndex - 1)
                    }

                >

                    <ChevronLeft
                        className="h-4 w-4"
                    />

                </Button>

                <span>

                    Page

                    <strong>

                        {" "}

                        {meta.current_page}

                    </strong>

                    /

                    {meta.last_page}

                </span>

                <Button

                    variant="outline"

                    size="icon"

                    disabled={
                        meta.current_page ===
                        meta.last_page
                    }

                    onClick={() =>
                        onPageChange(pageIndex + 1)
                    }

                >

                    <ChevronRight
                        className="h-4 w-4"
                    />

                </Button>

                <Button

                    variant="outline"

                    size="icon"

                    disabled={
                        meta.current_page ===
                        meta.last_page
                    }

                    onClick={() =>
                        onPageChange(
                            meta.last_page - 1
                        )
                    }

                >

                    <ChevronsRight
                        className="h-4 w-4"
                    />

                </Button>

            </div>

        </div>

    );

}