import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";
import { formatDateTime } from "@/lib/date";

import { useReturn } from "../hooks/useReturn";
import { useProcessReturn } from "../hooks/useProcessReturn";
import { formatMoney } from "../columns/return-columns";

export default function ReturnDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();
    const { data: item, isLoading, isError } = useReturn(uuid);
    const process = useProcessReturn();
    const [adminNote, setAdminNote] = useState("");
    const [pendingAction, setPendingAction] = useState<
        "approve" | "reject" | null
    >(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return <div className="text-sm text-muted-foreground">Loading return...</div>;
    }

    if (isError || !item) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Return Not Found</h1>
                <p className="text-sm text-muted-foreground">
                    Unable to load the requested return.
                </p>
                <Button variant="outline" onClick={() => navigate(ROUTES.RETURNS)}>
                    Back to Returns
                </Button>
            </div>
        );
    }

    const isProcessed = item.status === "approved" || item.status === "rejected";

    const requestProcess = (action: "approve" | "reject") => {
        setPendingAction(action);
        setConfirmOpen(true);
    };

    const confirmProcess = () => {
        if (!pendingAction) {
            return;
        }
        process.mutate(
            {
                uuid,
                data: {
                    action: pendingAction,
                    admin_note: adminNote.trim() || undefined,
                },
            },
            {
                onSuccess: () => {
                    setConfirmOpen(false);
                    setPendingAction(null);
                    setAdminNote("");
                    notification.success(
                        "Return processed.",
                        `The return has been ${pendingAction}ed.`
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to process return.",
                        "Please try again."
                    );
                },
            }
        );
    };

    const itemList = item.items ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.RETURNS)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Return {item.return_number}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Requested on {formatDateTime(item.created_at)}
                    </p>
                </div>

                <Badge variant="secondary">
                    <span className="capitalize">{item.status}</span>
                </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <InfoCard label="Order" value={item.order_number || "-"} />
                <InfoCard label="Customer" value={item.customer_name || "-"} />
                <InfoCard label="Refund Amount" value={formatMoney(item.refund_amount)} />
            </div>

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">Items</h2>
                </div>
                {itemList.length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">No items found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/20 text-left">
                                    <th className="px-4 py-3 font-medium">Product</th>
                                    <th className="px-4 py-3 font-medium">SKU</th>
                                    <th className="px-4 py-3 font-medium">Qty</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList.map((row) => (
                                    <tr key={row.uuid} className="border-b last:border-0">
                                        <td className="px-4 py-3">{row.product_name || "-"}</td>
                                        <td className="px-4 py-3 font-mono text-xs">{row.sku || "-"}</td>
                                        <td className="px-4 py-3">{row.quantity}</td>
                                        <td className="px-4 py-3 font-medium">{formatMoney(row.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>



            {!isProcessed && (
                <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-sm font-semibold">Processing</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a note (optional) then approve or reject this return.
                    </p>
                    <Textarea
                        rows={3}
                        className="mt-4"
                        placeholder="Admin note..."
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                    />
                    <div className="mt-4 flex gap-3">
                        <Button
                            variant="default"
                            disabled={process.isPending}
                            onClick={() => requestProcess("approve")}
                        >
                            Approve
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={process.isPending}
                            onClick={() => requestProcess("reject")}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            )}

            {item.admin_note && (
                <InfoCard label="Admin Note" value={item.admin_note} />
            )}

            {confirmOpen && pendingAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">
                            {pendingAction === "approve" ? "Approve" : "Reject"} Return?
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Are you sure you want to{" "}
                            <span className="capitalize">{pendingAction}</span> return{" "}
                            {item.return_number}?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                disabled={process.isPending}
                                onClick={() => setConfirmOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={pendingAction === "approve" ? "default" : "destructive"}
                                disabled={process.isPending}
                                onClick={confirmProcess}
                            >
                                {process.isPending ? "Processing..." : "Confirm"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoCard({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            <div className="mt-2 text-sm font-medium">{value}</div>
        </div>
    );
}
