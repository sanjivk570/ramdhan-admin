import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    shipmentSchema,
    type ShipmentFormData,
} from "../validation/shipment.schema";

interface ShipmentFormProps {
    initialData?: Partial<ShipmentFormData>;
    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;
    onSubmit: (data: ShipmentFormData) => void | Promise<void>;
    onCancel?: () => void;
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string | null;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

export default function ShipmentForm({
    initialData,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: ShipmentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ShipmentFormData>({
        resolver: zodResolver(shipmentSchema) as never,
        defaultValues: {
            order_uuid: "",
            carrier: "",
            service: "",
            tracking_number: "",
            tracking_url: "",
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }
        reset({
            order_uuid: initialData.order_uuid ?? "",
            carrier: initialData.carrier ?? "",
            service: initialData.service ?? "",
            tracking_number: initialData.tracking_number ?? "",
            tracking_url: initialData.tracking_url ?? "",
        });
    }, [initialData, reset]);

        const serverError = (field: string) => {
        const value = serverErrors[field];
        return value ? (Array.isArray(value) ? value[0] : value) : undefined;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverMessage && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {serverMessage}
                </div>
            )}

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Shipment Information
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Enter the carrier and tracking details.
                    </p>
                </div>

                <div className="px-6 py-6 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                            label="Order UUID"
                            error={errors.order_uuid?.message || serverError("order_uuid")}
                        >
                            <Input placeholder="Order UUID" {...register("order_uuid")} />
                        </Field>
                        <Field
                            label="Carrier"
                            error={errors.carrier?.message || serverError("carrier")}
                        >
                            <Input placeholder="e.g. FedEx, DHL, UPS" {...register("carrier")} />
                        </Field>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                            label="Service"
                            error={errors.service?.message || serverError("service")}
                        >
                            <Input placeholder="e.g. Express, Ground" {...register("service")} />
                        </Field>
                        <Field
                            label="Tracking Number"
                            error={errors.tracking_number?.message || serverError("tracking_number")}
                        >
                            <Input placeholder="Tracking number" {...register("tracking_number")} />
                        </Field>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field
                            label="Tracking URL"
                            error={errors.tracking_url?.message || serverError("tracking_url")}
                        >
                            <Input placeholder="https://..." {...register("tracking_url")} />
                        </Field>
                        <Field label="Items" error={null}>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Plus className="h-4 w-4" />
                                Leave empty to ship all items from the order.
                            </div>
                        </Field>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <Button type="button" variant="outline" disabled={loading} onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Shipment"}
                </Button>
            </div>
        </form>
    );
}
