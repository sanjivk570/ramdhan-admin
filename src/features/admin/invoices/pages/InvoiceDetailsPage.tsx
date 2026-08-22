import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";

import { useInvoice } from "../hooks/useInvoice";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

function statusVariant(status: string) {
    const value = (status || "").toLowerCase();
    if (value === "paid") return "success" as const;
    if (value === "cancelled" || value === "void")
        return "destructive" as const;
    return "secondary" as const;
}

export default function InvoiceDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: invoice, isLoading, isError } =
        useInvoice(uuid);

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading invoice...
            </div>
        );
    }

    if (isError || !invoice) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">
                    Invoice Not Found
                </h1>
                <p className="text-sm text-muted-foreground">
                    Unable to load the requested invoice.
                </p>
                <Button
                    variant="outline"
                    onClick={() => navigate(ROUTES.INVOICES)}
                >
                    Back to Sale Invoices
                </Button>
            </div>
        );
    }

    const itemList = invoice.items ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.INVOICES)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Invoice{" "}
                        {invoice.invoice_number ||
                            invoice.uuid.slice(0, 8)}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Created on{" "}
                        {formatDateTime(invoice.created_at)}
                    </p>
                </div>

                <Badge variant={statusVariant(invoice.status)}>
                    <span className="capitalize">
                        {invoice.status}
                    </span>
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                    label="Order"
                    value={invoice.order_number || "-"}
                />
                <InfoCard
                    label="Customer"
                    value={invoice.customer_name || "-"}
                />
                <InfoCard
                    label="Total"
                    value={formatMoney(
                        invoice.total,
                        invoice.currency
                    )}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <SummaryCard invoice={invoice} />
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">Items</h2>
                </div>
                {itemList.length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">
                        No items found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/20 text-left">
                                    <th className="px-4 py-3 font-medium">Product</th>
                                    <th className="px-4 py-3 font-medium">SKU</th>
                                    <th className="px-4 py-3 font-medium">Qty</th>
                                    <th className="px-4 py-3 font-medium">Price</th>
                                    <th className="px-4 py-3 font-medium">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList.map((item) => (
                                    <tr key={item.uuid} className="border-b last:border-0">
                                        <td className="px-4 py-3">{item.product_name || "-"}</td>
                                        <td className="px-4 py-3 font-mono text-xs">{item.sku || "-"}</td>
                                        <td className="px-4 py-3">{item.quantity}</td>
                                        <td className="px-4 py-3">
                                            {formatMoney(item.unit_price, invoice.currency)}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {formatMoney(item.line_total, invoice.currency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function SummaryCard({
    invoice,
}: {
    invoice: {
        currency: string;
        subtotal: number;
        discount: number;
        tax: number;
        shipping: number;
        total: number;
        invoice_date?: string;
        due_date?: string;
        customer_email?: string;
        status: string;
    };
}) {
    return (
        <>
            <div className="rounded-xl border bg-card p-6">
                <h3 className="text-sm font-semibold">Invoice Summary</h3>
                <dl className="mt-4 space-y-2 text-sm">
                    <Row label="Subtotal" value={formatMoney(invoice.subtotal, invoice.currency)} />
                    <Row label="Discount" value={formatMoney(invoice.discount, invoice.currency)} />
                    <Row label="Tax" value={formatMoney(invoice.tax, invoice.currency)} />
                    <Row label="Shipping" value={formatMoney(invoice.shipping, invoice.currency)} />
                    <Row label="Total" value={formatMoney(invoice.total, invoice.currency)} />
                </dl>
            </div>

            <div className="rounded-xl border bg-card p-6">
                <h3 className="text-sm font-semibold">Dates & Customer</h3>
                <dl className="mt-4 space-y-2 text-sm">
                    <Row label="Invoice Date" value={invoice.invoice_date || "-"} />
                    <Row label="Due Date" value={invoice.due_date || "-"} />
                    <Row label="Email" value={invoice.customer_email || "-"} />
                    <Row label="Status" value={invoice.status} />
                </dl>
            </div>
        </>
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
            <div className="mt-2 text-sm font-medium">{value}</div>
        </div>
    );
}

function Row({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <dt className="capitalize text-muted-foreground">{label}</dt>
            <dd className="font-medium">{value}</dd>
        </div>
    );
}


