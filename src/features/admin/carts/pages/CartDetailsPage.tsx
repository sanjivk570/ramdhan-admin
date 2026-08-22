import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";
import { formatMoney } from "@/features/admin/returns/columns/return-columns";

import { useCart } from "../hooks/useCart";

export default function CartDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: cart, isLoading, isError } = useCart(uuid);

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading cart...</div>;
    }

    if (isError || !cart) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Cart Not Found</h1>
                <p className="text-sm text-muted-foreground">
                    Unable to load the requested cart.
                </p>
                <Button variant="outline" onClick={() => navigate(ROUTES.CARTS)}>
                    Back to Carts
                </Button>
            </div>
        );
    }

    const itemList = cart.items ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.CARTS)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Cart {cart.uuid.slice(0, 8)}...
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Updated on {formatDateTime(cart.updated_at)}
                    </p>
                </div>
                <Badge variant="secondary">
                    <span className="capitalize">{cart.status}</span>
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                    label="Customer"
                    value={cart.customer?.name || "-"}
                />
                <InfoCard label="Total" value={formatMoney(cart.grand_total)} />
                <InfoCard label="Status" value={cart.status} />
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
                                    <th className="px-4 py-3 font-medium">
                                        Product
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        SKU
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Qty
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList.map((row) => (
                                    <tr
                                        key={row.uuid}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-4 py-3">
                                            {row.product_name || "-"}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs">
                                            {row.sku || "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            {row.quantity}
                                        </td>
                                        <td className="px-4 py-3">
                                            {formatMoney(row.unit_price)}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {formatMoney(row.line_total)}
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
