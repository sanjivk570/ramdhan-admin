import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    productSchema,
    type ProductFormData,
} from "../validation/product.schema";

interface Option {
    label: string;
    value: string;
}

interface ProductFormProps {
    mode?: "create" | "edit";
    initialData?: Partial<ProductFormData>;

    categories?: Option[];
    categoriesLoading?: boolean;

    units?: Option[];
    taxClasses?: Option[];
    optionsLoading?: boolean;

    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;

    onSubmit: (data: ProductFormData) => void | Promise<void>;
    onCancel?: () => void;
}

export default function ProductForm({
    mode = "create",
    initialData,
    categories = [],
    categoriesLoading = false,
    units = [],
    taxClasses = [],
    optionsLoading = false,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: ProductFormProps) {
    const isEdit = mode === "edit";

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: "",
            slug: "",
            sku: "",
            description: "",
            short_description: "",
            unit_id: undefined,
            tax_class_id: undefined,
            price: 0,
            compare_price: undefined,
            cost_price: undefined,
            stock_quantity: 0,
            low_stock_threshold: 5,
            is_active: true,
            is_featured: false,
            sort_order: 0,
            categories: [],
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            name: initialData.name ?? "",
            slug: initialData.slug ?? "",
            sku: initialData.sku ?? "",
            description: initialData.description ?? "",
            short_description: initialData.short_description ?? "",
            unit_id:
                initialData.unit_id == null
                    ? undefined
                    : Number(initialData.unit_id),
            tax_class_id:
                initialData.tax_class_id == null
                    ? undefined
                    : Number(initialData.tax_class_id),
            price: Number(initialData.price ?? 0),
            compare_price:
                initialData.compare_price == null
                    ? undefined
                    : Number(initialData.compare_price),
            cost_price:
                initialData.cost_price == null
                    ? undefined
                    : Number(initialData.cost_price),
            stock_quantity: Number(initialData.stock_quantity ?? 0),
            low_stock_threshold: Number(
                initialData.low_stock_threshold ?? 5
            ),
            is_active: initialData.is_active ?? true,
            is_featured: initialData.is_featured ?? false,
            sort_order: Number(initialData.sort_order ?? 0),
            categories: (initialData.categories ?? []).map(String),
        });
    }, [initialData, reset]);

    const serverError = (field: string) => {
        const value = serverErrors[field];

        if (!value) {
            return undefined;
        }

        return Array.isArray(value) ? value[0] : value;
    };

    const fieldError = (field: keyof ProductFormData) =>
        errors[field]?.message || serverError(String(field));

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

            {/* Basic Information */}
            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Basic Information
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Product identity, description and classification.
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                            Product Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                            placeholder="e.g. Realme P1 5g"
                            {...register("name")}
                        />
                        {fieldError("name") && (
                            <p className="text-sm text-destructive">
                                {fieldError("name")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Slug <span className="text-destructive">*</span>
                        </label>
                        <Input
                            placeholder="realme-p1-5g"
                            {...register("slug")}
                        />
                        {fieldError("slug") && (
                            <p className="text-sm text-destructive">
                                {fieldError("slug")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            SKU <span className="text-destructive">*</span>
                        </label>
                        <Input
                            placeholder="realme-p1-5g-sku"
                            {...register("sku")}
                        />
                        {fieldError("sku") && (
                            <p className="text-sm text-destructive">
                                {fieldError("sku")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                            Short Description
                        </label>
                        <Input
                            placeholder="Short product summary"
                            {...register("short_description")}
                        />
                        {fieldError("short_description") && (
                            <p className="text-sm text-destructive">
                                {fieldError("short_description")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            rows={5}
                            placeholder="Full product description"
                            {...register("description")}
                        />
                    </div>

                    {/* Unit */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Unit
                        </label>

                        <Controller
                            name="unit_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={
                                        field.value !== undefined &&
                                        field.value !== null
                                            ? String(field.value)
                                            : ""
                                    }
                                    onValueChange={(value) => {
                                        field.onChange(Number(value));
                                    }}
                                    disabled={optionsLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                optionsLoading
                                                    ? "Loading units..."
                                                    : "Select unit"
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {units.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={String(item.value)}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}

                                        {!optionsLoading && units.length === 0 && (
                                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                No units available.
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {fieldError("unit_id") && (
                            <p className="text-sm text-destructive">
                                {fieldError("unit_id")}
                            </p>
                        )}
                    </div>

                    {/* Tax Class */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Tax Class
                        </label>

                        <Controller
                            name="tax_class_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={
                                        field.value !== undefined &&
                                        field.value !== null
                                            ? String(field.value)
                                            : ""
                                    }
                                    onValueChange={(value) => {
                                        field.onChange(Number(value));
                                    }}
                                    disabled={optionsLoading}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                optionsLoading
                                                    ? "Loading tax classes..."
                                                    : "Select tax class"
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {taxClasses.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={String(item.value)}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}

                                        {!optionsLoading && taxClasses.length === 0 && (
                                            <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                                No tax classes available.
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {fieldError("tax_class_id") && (
                            <p className="text-sm text-destructive">
                                {fieldError("tax_class_id")}
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="space-y-3 md:col-span-2">
                        <div>
                            <label className="text-sm font-medium">
                                Categories <span className="text-destructive">*</span>
                            </label>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Select one or more categories for this product.
                            </p>
                        </div>

                        <Controller
                            name="categories"
                            control={control}
                            render={({ field }) => (
                                <div className="rounded-lg border p-4">
                                    {categoriesLoading ? (
                                        <p className="text-sm text-muted-foreground">
                                            Loading categories...
                                        </p>
                                    ) : categories.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No categories available.
                                        </p>
                                    ) : (
                                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {categories.map((category) => {
                                                const categoryValue = String(category.value);
                                                const selectedValues = field.value ?? [];
                                                const checked = selectedValues.some(
                                                    (value) =>
                                                        String(value) === categoryValue
                                                );

                                                return (
                                                    <label
                                                        key={categoryValue}
                                                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted/50"
                                                    >
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={(checkedValue) => {
                                                                const current = (
                                                                    field.value ?? []
                                                                ).map(String);

                                                                const next = checkedValue
                                                                    ? Array.from(
                                                                          new Set([
                                                                              ...current,
                                                                              categoryValue,
                                                                          ])
                                                                      )
                                                                    : current.filter(
                                                                          (value) =>
                                                                              value !== categoryValue
                                                                      );

                                                                field.onChange(next);
                                                            }}
                                                        />
                                                        <span>{category.label}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        />

                        {fieldError("categories") && (
                            <p className="text-sm text-destructive">
                                {fieldError("categories")}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">Pricing</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Customer price, comparison price and internal cost.
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Price <span className="text-destructive">*</span>
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("price")}
                        />
                        {fieldError("price") && (
                            <p className="text-sm text-destructive">
                                {fieldError("price")}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Compare Price
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("compare_price")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Cost Price
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("cost_price")}
                        />
                    </div>
                </div>
            </section>

            {/* Inventory & Publishing */}
            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Inventory & Publishing
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Initial stock and product visibility settings.
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Stock Quantity <span className="text-destructive">*</span>
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="1"
                            {...register("stock_quantity")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Low Stock Threshold <span className="text-destructive">*</span>
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="1"
                            {...register("low_stock_threshold")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Sort Order
                        </label>
                        <Input
                            type="number"
                            min="0"
                            step="1"
                            {...register("sort_order")}
                        />
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <label className="flex cursor-pointer items-center gap-2 text-sm">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(value) =>
                                            field.onChange(Boolean(value))
                                        }
                                    />
                                    Active
                                </label>
                            )}
                        />

                        <Controller
                            name="is_featured"
                            control={control}
                            render={({ field }) => (
                                <label className="flex cursor-pointer items-center gap-2 text-sm">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(value) =>
                                            field.onChange(Boolean(value))
                                        }
                                    />
                                    Featured
                                </label>
                            )}
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3">
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
                          ? "Update Product"
                          : "Create Product"}
                </Button>
            </div>
        </form>
    );
}

