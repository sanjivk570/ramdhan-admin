import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";

import StatusBadge from "@/components/common/StatusBadge";
import { useCustomer } from "../hooks/useCustomerQueries";
import type { CustomerAddress } from "../types/customer";

function AddressCard({ address }: { address: CustomerAddress }) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold capitalize">
                        {address.address_type || "Address"}
                    </span>
                </div>
                {address.is_default ? (
                    <Badge variant="secondary">Default</Badge>
                ) : null}
            </div>

            <p className="mt-3 text-sm font-medium">
                {[address.first_name, address.last_name]
                    .filter(Boolean)
                    .join(" ") || "-"}
                {address.company ? ` · ${address.company}` : ""}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
                {[address.address_line_1, address.address_line_2]
                    .filter(Boolean)
                    .join(", ")}
            </p>
            <p className="text-sm text-muted-foreground">
                {[address.city, address.state, address.postal_code]
                    .filter(Boolean)
                    .join(", ")}
            </p>
            <p className="text-sm text-muted-foreground">
                {[address.country, address.phone]
                    .filter(Boolean)
                    .join(" · ")}
            </p>
        </div>
    );
}

export default function CustomerDetailsPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();

    const { data: customer, isLoading, isError } =
        useCustomer(uuid);

    if (!uuid) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading customer...
            </div>
        );
    }

    if (isError || !customer) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">
                    Customer Not Found
                </h1>
                <Button
                    variant="outline"
                    onClick={() => navigate(ROUTES.CUSTOMERS)}
                >
                    Back to Customers
                </Button>
            </div>
        );
    }

    const addresses = customer.addresses ?? [];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(ROUTES.CUSTOMERS)}
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        {[customer.first_name, customer.last_name]
                            .filter(Boolean)
                            .join(" ")}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Joined {formatDateTime(customer.created_at)}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <StatusBadge isActive={Boolean(customer.is_active)} />
                    <Button
                        size="sm"
                        onClick={() =>
                            navigate(
                                `${ROUTES.CUSTOMERS}/${customer.uuid}/edit`
                            )
                        }
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <InfoCard label="Email" value={customer.email} />
                <InfoCard
                    label="Mobile"
                    value={
                        customer.mobile
                            ? `${customer.country_code ?? ""}${customer.mobile}`
                            : "-"
                    }
                />
                <InfoCard
                    label="Addresses"
                    value={String(addresses.length)}
                />
                <InfoCard
                    label="Updated"
                    value={formatDateTime(customer.updated_at)}
                />
            </div>

            <div>
                <h2 className="mb-3 text-base font-semibold">
                    Addresses
                </h2>
                {addresses.length === 0 ? (
                    <div className="rounded-xl border bg-muted/10 p-8 text-center text-sm text-muted-foreground">
                        No saved addresses for this customer.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.uuid}
                                address={address}
                            />
                        ))}
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

