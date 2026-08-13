import {
    ArrowLeft,
    Pencil,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";

import { useTaxClass } from "../hooks/useTaxClass";

export default function TaxClassDetailsPage() {
    const navigate = useNavigate();

    const { uuid } = useParams<{ uuid: string }>();

    const {
        data: taxClass,
        isLoading,
        isError,
    } = useTaxClass(uuid);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tax Class Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading tax class information...
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    Loading...
                </div>
            </div>
        );
    }

    if (isError || !taxClass) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tax Class Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Unable to load tax class information.
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <p className="text-sm text-destructive">
                        Tax class not found or something went wrong.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                            navigate(ROUTES.TAX_CLASSES)
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tax Classes
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Tax Class Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View tax class configuration.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(ROUTES.TAX_CLASSES)
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `${ROUTES.TAX_CLASSES}/${taxClass.uuid}/edit`
                            )
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Tax Class Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Tax class account configuration.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Name
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxClass.name || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Code
                        </p>

                        <p className="mt-1 font-mono text-sm">
                            {taxClass.code || "-"}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                            Description
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxClass.description || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>

                        <div className="mt-1">
                            <Badge
                                variant={
                                    taxClass.is_active
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {taxClass.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Sort Order
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxClass.sort_order}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Created At
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatDateTime(taxClass.created_at)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Updated At
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatDateTime(taxClass.updated_at)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">
                    Tax Class UUID
                </p>

                <p className="mt-1 break-all font-mono text-sm">
                    {taxClass.uuid}
                </p>
            </div>
        </div>
    );
}
