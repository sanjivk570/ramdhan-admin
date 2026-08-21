import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    couponSchema,
    type CouponFormData,
} from "../validation/coupon.schema";

interface CouponFormProps {
    mode?: "create" | "edit";
    initialData?: Partial<CouponFormData>;
    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;
    onSubmit: (data: CouponFormData) => void | Promise<void>;
    onCancel?: () => void;
}

export default function CouponForm({
    mode = "create",
    initialData,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: CouponFormProps) {
    const isEdit = mode === "edit";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CouponFormData>({
        resolver: zodResolver(couponSchema) as never,
        defaultValues: {
            code: "",
            name: "",
            discount_type: "percentage",
            discount_value: 0,
            maximum_discount: undefined,
            minimum_order_amount: 0,
            usage_limit: undefined,
            per_customer_limit: 1,
            starts_at: "",
            ends_at: "",
            is_active: true,
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            code: initialData.code ?? "",
            name: initialData.name ?? "",
            discount_type: initialData.discount_type ?? "percentage",
            discount_value: Number(initialData.discount_value ?? 0),
            maximum_discount:
                initialData.maximum_discount != null
                    ? Number(initialData.maximum_discount)
                    : undefined,
            minimum_order_amount: Number(initialData.minimum_order_amount ?? 0),
            usage_limit:
                initialData.usage_limit != null
                    ? Number(initialData.usage_limit)
                    : undefined,
            per_customer_limit: Number(initialData.per_customer_limit ?? 1),
            starts_at: initialData.starts_at ?? "",
            ends_at: initialData.ends_at ?? "",
            is_active: initialData.is_active ?? true,
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
                    <h2 className="text-base font-semibold">Coupon Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? "Update the coupon configuration."
                            : "Create a discount coupon for customers."}
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <Field label="Code" error={errors.code?.message || serverError("code")}>
                        <Input placeholder="e.g. WELCOME10" {...register("code")} />
                    </Field>

                    <Field label="Name" error={errors.name?.message || serverError("name")}>
                        <Input placeholder="e.g. Welcome 10% Off" {...register("name")} />
                    </Field>

                    <Field label="Discount Type" error={serverError("discount_type")}>
                        <Controller
                            name="discount_type"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">Percentage</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>

                    <Field label="Discount Value" error={errors.discount_value?.message || serverError("discount_value")}>
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            {...register("discount_value", { valueAsNumber: true })}
                        />
                    </Field>


                    <Field label="Maximum Discount" error={serverError("maximum_discount")}>
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="Optional"
                            {...register("maximum_discount", { valueAsNumber: true })}
                        />
                    </Field>

                    <Field label="Minimum Order Amount" error={errors.minimum_order_amount?.message || serverError("minimum_order_amount")}>
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            {...register("minimum_order_amount", { valueAsNumber: true })}
                        />
                    </Field>

                    <Field label="Usage Limit" error={serverError("usage_limit")}>
                        <Input
                            type="number"
                            min={0}
                            placeholder="Optional"
                            {...register("usage_limit", { valueAsNumber: true })}
                        />
                    </Field>

                    <Field label="Per Customer Limit" error={errors.per_customer_limit?.message || serverError("per_customer_limit")}>
                        <Input
                            type="number"
                            min={0}
                            {...register("per_customer_limit", { valueAsNumber: true })}
                        />
                    </Field>

                    <Field label="Starts At" error={serverError("starts_at")}>
                        <Input type="datetime-local" {...register("starts_at")} />
                    </Field>

                    <Field label="Ends At" error={serverError("ends_at")}>
                        <Input type="datetime-local" {...register("ends_at")} />
                    </Field>

                    <Field label="Status">
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value ? "1" : "0"}
                                    onValueChange={(value) =>
                                        field.onChange(value === "1")
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <Button type="button" variant="outline" disabled={loading} onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button type="submit" disabled={loading}>
                    {loading
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                          ? "Update Coupon"
                          : "Create Coupon"}
                </Button>
            </div>
        </form>
    );
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

