import {
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    CheckCircle,
    XCircle,
    RotateCcw,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface DataTableActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onRestore?: () => void;
    onActivate?: () => void;
    onDeactivate?: () => void;

    isActive?: boolean;
    isDeleted?: boolean;

    loading?: boolean;
}

export default function DataTableActions({
    onView,
    onEdit,
    onDelete,
    onRestore,
    onActivate,
    onDeactivate,
    isActive,
    isDeleted = false,
    loading = false,
}: DataTableActionsProps) {

    const hasActions =
        onView ||
        onEdit ||
        onDelete ||
        onRestore ||
        onActivate ||
        onDeactivate;

    if (!hasActions) {
        return null;
    }

    return (
        <DropdownMenu>

            {/* <DropdownMenuTrigger asChild>

                <Button
                    variant="ghost"
                    size="icon"
                    disabled={loading}
                    className="h-8 w-8"
                >
                    <MoreHorizontal className="h-4 w-4" />

                    <span className="sr-only">
                        Open actions
                    </span>
                </Button>

            </DropdownMenuTrigger> */}

            <DropdownMenuTrigger
                className="
                    inline-flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-md
                    hover:bg-muted
                "
            >
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-44"
            >

                {/* View */}

                {onView && (
                    <DropdownMenuItem
                        onClick={onView}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </DropdownMenuItem>
                )}

                {/* Edit */}

                {onEdit && (
                    <DropdownMenuItem
                        onClick={onEdit}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                )}

                {/* Activate / Deactivate */}

                {(onActivate || onDeactivate) && (
                    <>
                        <DropdownMenuSeparator />

                        {isActive && onDeactivate && (
                            <DropdownMenuItem
                                onClick={onDeactivate}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate
                            </DropdownMenuItem>
                        )}

                        {!isActive && onActivate && (
                            <DropdownMenuItem
                                onClick={onActivate}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate
                            </DropdownMenuItem>
                        )}
                    </>
                )}

                {/* Restore */}

                {isDeleted && onRestore && (
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={onRestore}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restore
                        </DropdownMenuItem>
                    </>
                )}

                {/* Delete */}

                {!isDeleted && onDelete && (
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={onDelete}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </>
                )}

            </DropdownMenuContent>

        </DropdownMenu>
    );
}