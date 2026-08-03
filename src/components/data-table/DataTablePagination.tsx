import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

        <div className="mt-5 rounded-xl border bg-card shadow-sm">

            <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Left */}

                <div className="text-sm text-muted-foreground">

                    Showing{" "}

                    <span className="font-semibold text-foreground">
                        {meta.from}
                    </span>

                    {" - "}

                    <span className="font-semibold text-foreground">
                        {meta.to}
                    </span>

                    {" of "}

                    <span className="font-semibold text-foreground">
                        {meta.total}
                    </span>

                    {" records"}

                </div>

                {/* Right */}

                <div className="flex flex-wrap items-center gap-4">

                    {/* Page Size */}

                    <div className="flex items-center gap-2">

                        <span className="text-sm text-muted-foreground">

                            Rows

                        </span>

                        <Select
                            value={String(pageSize)}
                            onValueChange={(value) =>
                                onPageSizeChange(Number(value))
                            }
                        >

                            <SelectTrigger className="w-20">

                                <SelectValue />

                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="10">
                                    10
                                </SelectItem>

                                <SelectItem value="25">
                                    25
                                </SelectItem>

                                <SelectItem value="50">
                                    50
                                </SelectItem>

                                <SelectItem value="100">
                                    100
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Page */}

                    <div className="text-sm">

                        Page{" "}

                        <span className="font-semibold">

                            {meta.current_page}

                        </span>

                        {" of "}

                        <span className="font-semibold">

                            {meta.last_page}

                        </span>

                    </div>

                    {/* Buttons */}

                    <div className="flex items-center gap-1">

                        <Button
                            variant="outline"
                            size="icon"
                            disabled={meta.current_page === 1}
                            onClick={() => onPageChange(0)}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            disabled={meta.current_page === 1}
                            onClick={() =>
                                onPageChange(pageIndex - 1)
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            disabled={
                                meta.current_page === meta.last_page
                            }
                            onClick={() =>
                                onPageChange(pageIndex + 1)
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            disabled={
                                meta.current_page === meta.last_page
                            }
                            onClick={() =>
                                onPageChange(meta.last_page - 1)
                            }
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>

                    </div>

                </div>

            </div>

        </div>

    );

}