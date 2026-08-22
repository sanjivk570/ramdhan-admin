import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";
import { useSupplier } from "../hooks/useSupplierQueries";
import { usePurchaseOrders } from "@/features/admin/purchases/hooks/usePurchaseQueries";
import type { PurchaseOrderListParams } from "@/features/admin/purchases/types/purchase";

import { PurchaseOrderMiniTable } from "@/features/admin/purchases/components/PurchaseOrderMiniTable";

export default function SupplierDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: supplier, isLoading, isError } =
        useSupplier(uuid);

        const { data: poData, isLoading: poLoading } = usePurchaseOrders({
        filters: { supplier_id: uuid },
    } as PurchaseOrderListParams);

    if (!uuid) return null;

    if (isLoading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading supplier...
            </div>
        );
    }

    if (isError || !supplier) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">
                    Supplier Not Found
                </h1>
                <Button
                    variant="outline"
                    onClick={() => navigate(ROUTES.SUPPLIERS)}
                >
                    Back to Suppliers
                </Button>
            </div>
        );
    }

    const poList = poData?.data ?? [];
    const poTotal = poList.length;
        const poGrandTotal = poList.reduce(
        (sum, po) => sum + Number(po.grand_total ?? 0),
        0
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.SUPPLIERS)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        {supplier.company_name}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Supplier profile — joined{" "}
                        {formatDateTime(supplier.created_at)}
                    </p>
                </div>
                <Button
                    size="sm"
                    onClick={() =>
                        navigate(
                            `${ROUTES.SUPPLIERS}/${supplier.uuid}/edit`
                        )
                    }
                >
                    Edit
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <InfoCard
                    label="Contact Person"
                    value={supplier.contact_person || "-"}
                />
                <InfoCard
                    label="Email"
                    value={supplier.email || "-"}
                />
                <InfoCard
                    label="Mobile"
                    value={
                        supplier.mobile
                            ? `${supplier.country_code ?? ""}${supplier.mobile}`
                            : "-"
                    }
                />
                <InfoCard
                    label="GSTIN"
                    value={supplier.gstin || "-"}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <InfoCard
                    label="PAN"
                    value={supplier.pan || "-"}
                />
                <InfoCard
                    label="Website"
                    value={
                        supplier.website ? (
                            <a
                                href={supplier.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline"
                            >
                                {supplier.website}
                            </a>
                        ) : "-"
                    }
                />
                <InfoCard
                    label="Payment Terms"
                    value={
                        supplier.payment_terms_days
                            ? `${supplier.payment_terms_days} days`
                            : "-"
                    }
                />
                <InfoCard
                    label="Credit Limit"
                    value={
                        supplier.credit_limit
                            ? `₹${Number(supplier.credit_limit).toLocaleString("en-IN")}`
                            : "-"
                    }
                />
            </div>

            <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-3 text-base font-semibold">
                    Purchase Orders
                </h2>
                {poLoading ? (
                    <div className="text-sm text-muted-foreground">
                        Loading purchase orders...
                    </div>
                ) : poTotal === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        No purchase orders found for this supplier.
                    </div>
                ) : (
                    <>
                        <p className="mb-2 text-sm text-muted-foreground">
                            {poTotal} purchase order
                            {poTotal !== 1 ? "s" : ""} ·
                            Total: ₹
                            {poGrandTotal.toLocaleString("en-IN")}
                        </p>
                        <PurchaseOrderMiniTable
                            orders={poList}
                            onView={(po) =>
                                navigate(
                                    `${ROUTES.PURCHASE_ORDERS}/${po.uuid}`
                                )
                            }
                        />
                    </>
                )}
            </div>

            {supplier.notes && (
                <div className="rounded-xl border bg-card p-6">
                    <h2 className="mb-2 text-base font-semibold">
                        Notes
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {supplier.notes}
                    </p>
                </div>
            )}
        </div>
    );
}

function InfoCard({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <div className="mt-2 text-sm font-medium">
                {value}
            </div>
        </div>
    );
}