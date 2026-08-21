import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";
import { formatDateTime } from "@/lib/date";

import { useOrder } from "../hooks/useOrder";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { formatMoney } from "../columns/order-columns";

const ORDER_STATUSES = [
    "pending",
    "processing",
    "shipped",
    "completed",
    "cancelled",
    "refunded",
];

export default function OrderDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: order, isLoading, isError } = useOrder(uuid);
    const updateStatus = useUpdateOrderStatus();
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading order...</div>;
    }

    if (isError || !order) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Order Not Found</h1>
                <p className="text-sm text-muted-foreground">
                    Unable to load the requested order.
                </p>
                <Button variant="outline" onClick={() => navigate(ROUTES.ORDERS)}>
                    Back to Orders
                </Button>
            </div>
        );
    }

    const handleStatusChange = (status: string) => {
        updateStatus.mutate(
            { uuid, data: { status } },
            {
                onSuccess: () => {
                    setSelectedStatus(status);
                    notification.success(
                        "Order status updated.",
                        `Order is now marked as ${status}.`
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to update order status.",
                        "Please try again."
                    );
                },
            }
        );
    };

    const itemList = order.items ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.ORDERS)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Order {order.order_number}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Placed on {formatDateTime(order.created_at)}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select
                        value={selectedStatus || order.status}
                        onValueChange={(value) =>
                            handleStatusChange(value ?? "")
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {ORDER_STATUSES.map((status) => (
                                <SelectItem key={status} value={status}>
                                    <span className="capitalize">{status}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <SummaryCard
                    label="Status"
                    value={<Badge variant="secondary">{order.status}</Badge>}
                />
                <SummaryCard
                    label="Payment"
                    value={<Badge variant="secondary">{order.payment_status}</Badge>}
                />
                <SummaryCard
                    label="Fulfilment"
                    value={
                        <Badge variant="secondary">{order.fulfillment_status}</Badge>
                    }
                />
                <SummaryCard
                    label="Total"
                    value={
                        <span className="font-semibold">
                            {formatMoney(order.total, order.currency)}
                        </span>
                    }
                />
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
                                        <td className="px-4 py-3">{formatMoney(item.price, order.currency)}</td>
                                        <td className="px-4 py-3 font-medium">{formatMoney(item.total, order.currency)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-sm font-semibold">Order Summary</h3>
                    <dl className="mt-4 space-y-2 text-sm">
                        <Row label="Subtotal" value={formatMoney(order.subtotal, order.currency)} />
                        <Row label="Discount" value={formatMoney(order.discount, order.currency)} />
                        <Row label="Tax" value={formatMoney(order.tax, order.currency)} />
                        <Row label="Shipping" value={formatMoney(order.shipping, order.currency)} />
                        <Row label="Total" value={formatMoney(order.total, order.currency)} />
                    </dl>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-sm font-semibold">Customer</h3>
                    <dl className="mt-4 space-y-2 text-sm">
                        <Row label="Name" value={order.customer_name || "-"} />
                        <Row label="Email" value={order.customer_email || "-"} />
                        <Row label="Mobile" value={order.customer_mobile || "-"} />
                    </dl>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
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
            <div className="mt-2">{value}</div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium">{value}</dd>
        </div>
    );
}

