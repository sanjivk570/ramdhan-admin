import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    taxClassSchema,
    type TaxClassFormData,
} from "../validation/tax-class.schema";

interface TaxClassFormProps {
    mode?: "create" | "edit";
    initialData?: Partial<TaxClassFormData>;
    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;
    onSubmit: (data: TaxClassFormData) => void | Promise<void>;
    onCancel?: () => void;
}

export default function TaxClassForm({
    mode = "create",
    initialData,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: TaxClassFormProps) {
    const isEdit = mode === "edit";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaxClassFormData>({
        resolver: zodResolver(taxClassSchema) as never,
        defaultValues: {
            name: "",
            code: "",
            description: "",
            is_active: true,
            sort_order: 0,
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            name: initialData.name ?? "",
            code: initialData.code ?? "",
            description: initialData.description ?? "",
            is_active: initialData.is_active ?? true,
            sort_order: initialData.sort_order ?? 0,
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
                        Tax Class Information
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? "Update the tax class configuration."
                            : "Create a tax class for grouping applicable tax rates."}
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            htmlFor="tax-class-name"
                            className="text-sm font-medium"
                        >
                            Name
                            <span className="ml-1 text-destructive">*</span>
                        </label>

                        <Input
                            id="tax-class-name"
                            placeholder="e.g. GST Standard"
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
                            htmlFor="tax-class-code"
                            className="text-sm font-medium"
                        >
                            Code
                            <span className="ml-1 text-destructive">*</span>
                        </label>

                        <Input
                            id="tax-class-code"
                            placeholder="e.g. GST_STANDARD"
                            className="font-mono"
                            {...register("code")}
                        />

                        {errors.code && (
                            <p className="text-sm text-destructive">
                                {errors.code.message}
                            </p>
                        )}

                        {getServerError("code") && (
                            <p className="text-sm text-destructive">
                                {getServerError("code")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label
                            htmlFor="tax-class-description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>

                        <Textarea
                            id="tax-class-description"
                            placeholder="Describe when this tax class should be used."
                            rows={4}
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
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

                        {getServerError("is_active") && (
                            <p className="text-sm text-destructive">
                                {getServerError("is_active")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="tax-class-sort-order"
                            className="text-sm font-medium"
                        >
                            Sort Order
                        </label>

                        <Input
                            id="tax-class-sort-order"
                            type="number"
                            min={0}
                            {...register("sort_order", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.sort_order && (
                            <p className="text-sm text-destructive">
                                {errors.sort_order.message}
                            </p>
                        )}
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
                          ? "Update Tax Class"
                          : "Create Tax Class"}
                </Button>
            </div>
        </form>
    );
}
