import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {

    title?: string;

    description?: string;

    actionLabel?: string;

    onAction?: () => void;

}

export default function DataTableEmpty({

    title = "No records found",

    description = "Try changing your search or filters.",

    actionLabel,

    onAction,

}: Props) {

    return (

        <div className="flex flex-col items-center justify-center py-14">

            <SearchX
                className="mb-4 h-14 w-14 text-muted-foreground"
            />

            <h3 className="text-lg font-semibold">

                {title}

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

                {description}

            </p>

            {actionLabel && onAction && (

                <Button

                    className="mt-5"

                    onClick={onAction}

                >

                    {actionLabel}

                </Button>

            )}

        </div>

    );

}