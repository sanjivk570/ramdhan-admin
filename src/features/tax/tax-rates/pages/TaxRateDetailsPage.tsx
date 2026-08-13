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

import { useTaxRate } from "../hooks/useTaxRate";

export default function TaxRateDetailsPage() {
    const navigate = useNavigate();

    const { uuid } = useParams<{ uuid: string }>();

    const {
        data: taxRate,
        isLoading,
        isError,
    } = useTaxRate(uuid);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tax Rate Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading tax rate information...
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    Loading...
                </div>
            </div>
        );
    }

    if (isError || !taxRate) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tax Rate Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Unable to load tax rate information.
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <p className="text-sm text-destructive">
                        Tax rate not found or something went wrong.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                            navigate(ROUTES.TAX_RATES)
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tax Rates
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
                        Tax Rate Details
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View tax rate configuration.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(ROUTES.TAX_RATES)
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    <Button
                        onClick={() =>
                            navigate(
                                `${ROUTES.TAX_RATES}/${taxRate.uuid}/edit`
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
                        Tax Rate Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Tax rate and applicability details.
                    </p>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Name
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxRate.name || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Rate
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                            {Number(taxRate.rate).toFixed(2)}%
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Tax Class
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxRate.tax_class?.name ||
                                taxRate.tax_class_uuid ||
                                "-"}
                        </p>

                        {taxRate.tax_class?.code && (
                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                                {taxRate.tax_class.code}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Country
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxRate.country_code || "All"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            State
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxRate.state_code || "All"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Priority
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {taxRate.priority}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>

                        <div className="mt-1">
                            <Badge
                                variant={
                                    taxRate.is_active
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {taxRate.is_active
                                    ? "Active"
                                    : "Inactive"}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Created At
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatDateTime(taxRate.created_at)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Updated At
                        </p>

                        <p className="mt-1 text-sm font-medium">
                            {formatDateTime(taxRate.updated_at)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground">
                    Tax Rate UUID
                </p>

                <p className="mt-1 break-all font-mono text-sm">
                    {taxRate.uuid}
                </p>
            </div>
        </div>
    );
}
