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
    taxRateSchema,
    type TaxRateFormData,
} from "../validation/tax-rate.schema";

interface TaxClassOption {
    label: string;
    value: string;
}

interface TaxRateFormProps {
    mode?: "create" | "edit";
    initialData?: Partial<TaxRateFormData>;
    taxClasses?: TaxClassOption[];
    taxClassesLoading?: boolean;
    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;
    onSubmit: (data: TaxRateFormData) => void | Promise<void>;
    onCancel?: () => void;
}

export default function TaxRateForm({
    mode = "create",
    initialData,
    taxClasses = [],
    taxClassesLoading = false,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: TaxRateFormProps) {
    const isEdit = mode === "edit";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaxRateFormData>({
        resolver: zodResolver(taxRateSchema) as never,
        defaultValues: {
            name: "",
            rate: 0,
            tax_class_uuid: "",
            country_code: "IN",
            state_code: "",
            priority: 1,
            is_active: true,
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            name: initialData.name ?? "",
            rate:
                initialData.rate !== undefined
                    ? Number(initialData.rate)
                    : 0,
            tax_class_uuid:
                initialData.tax_class_uuid ?? "",
            country_code:
                initialData.country_code ?? "IN",
            state_code:
                initialData.state_code ?? "",
            priority: initialData.priority ?? 1,
            is_active: initialData.is_active ?? true,
        });
    }, [initialData, reset]);

    const getServerError = (field: string) => {
        const error = serverErrors[field];

        if (!error) {
            return null;
        }

        return Array.isArray(error) ? error[0] : error;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {serverMessage && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {serverMessage}
                </div>
            )}

            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Tax Rate Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? "Update the tax rate and applicability."
                            : "Create a tax rate under a tax class."}
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            htmlFor="tax-rate-name"
                            className="text-sm font-medium"
                        >
                            Name
                            <span className="ml-1 text-destructive">*</span>
                        </label>

                        <Input
                            id="tax-rate-name"
                            placeholder="e.g. GST 18%"
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}

                        {getServerError("name") && (
                            <p className="text-sm text-destructive">
                                {getServerError("name")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tax-rate-rate"
                            className="text-sm font-medium"
                        >
                            Rate (%)
                            <span className="ml-1 text-destructive">*</span>
                        </label>

                        <div className="relative">
                            <Input
                                id="tax-rate-rate"
                                type="number"
                                min={0}
                                max={100}
                                step="0.01"
                                className="pr-10"
                                placeholder="18.00"
                                {...register("rate", {
                                    valueAsNumber: true,
                                })}
                            />

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                %
                            </span>
                        </div>

                        {errors.rate && (
                            <p className="text-sm text-destructive">
                                {errors.rate.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Tax Class
                            <span className="ml-1 text-destructive">*</span>
                        </label>

                        <Controller
                            name="tax_class_uuid"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={taxClassesLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                taxClassesLoading
                                                    ? "Loading tax classes..."
                                                    : "Select tax class"
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {taxClasses.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {errors.tax_class_uuid && (
                            <p className="text-sm text-destructive">
                                {errors.tax_class_uuid.message}
                            </p>
                        )}

                        {getServerError("tax_class_uuid") && (
                            <p className="text-sm text-destructive">
                                {getServerError("tax_class_uuid")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tax-rate-country"
                            className="text-sm font-medium"
                        >
                            Country Code
                        </label>

                        <Input
                            id="tax-rate-country"
                            placeholder="IN"
                            className="uppercase"
                            {...register("country_code")}
                        />

                        {errors.country_code && (
                            <p className="text-sm text-destructive">
                                {errors.country_code.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tax-rate-state"
                            className="text-sm font-medium"
                        >
                            State Code
                        </label>

                        <Input
                            id="tax-rate-state"
                            placeholder="UP"
                            className="uppercase"
                            {...register("state_code")}
                        />

                        <p className="text-xs text-muted-foreground">
                            Leave blank when the rate applies to all states.
                        </p>

                        {errors.state_code && (
                            <p className="text-sm text-destructive">
                                {errors.state_code.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tax-rate-priority"
                            className="text-sm font-medium"
                        >
                            Priority
                        </label>

                        <Input
                            id="tax-rate-priority"
                            type="number"
                            min={0}
                            {...register("priority", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.priority && (
                            <p className="text-sm text-destructive">
                                {errors.priority.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Status
                        </label>

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
                                        <SelectItem value="1">
                                            Active
                                        </SelectItem>

                                        <SelectItem value="0">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}

                <Button type="submit" disabled={loading}>
                    {loading
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                          ? "Update Tax Rate"
                          : "Create Tax Rate"}
                </Button>
            </div>
        </form>
    );
}
