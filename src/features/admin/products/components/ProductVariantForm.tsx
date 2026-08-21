// import { useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { productVariantSchema, type ProductVariantFormData } from "../validation/product-variant.schema";

// interface AttributeOption {
//     uuid: string;
//     label: string;
// }

// interface Props {
//     mode?: "create" | "edit";
//     initialData?: Partial<ProductVariantFormData>;
//     attributes?: AttributeOption[];
//     loading?: boolean;
//     onSubmit: (data: ProductVariantFormData) => void | Promise<void>;
//     onCancel?: () => void;
// }

// export default function ProductVariantForm({
//     mode = "create",
//     initialData,
//     attributes = [],
//     loading = false,
//     onSubmit,
//     onCancel,
// }: Props) {
//     const isEdit = mode === "edit";

//     const { register, control, reset, handleSubmit, formState: { errors } } =
//         useForm<ProductVariantFormData>({
//             resolver: zodResolver(productVariantSchema),
//             defaultValues: {
//                 name: "",
//                 sku: "",
//                 price: 0,
//                 compare_price: undefined,
//                 cost_price: undefined,
//                 stock_quantity: 0,
//                 low_stock_threshold: 5,
//                 is_default: false,
//                 is_active: true,
//                 sort_order: 0,
//                 attribute_values: [],
//             },
//         });

//     useEffect(() => {
//         if (initialData) {
//             reset({
//                 name: initialData.name ?? "",
//                 sku: initialData.sku ?? "",
//                 price: Number(initialData.price ?? 0),
//                 compare_price: initialData.compare_price == null ? undefined : Number(initialData.compare_price),
//                 cost_price: initialData.cost_price == null ? undefined : Number(initialData.cost_price),
//                 stock_quantity: Number(initialData.stock_quantity ?? 0),
//                 low_stock_threshold: Number(initialData.low_stock_threshold ?? 5),
//                 is_default: initialData.is_default ?? false,
//                 is_active: initialData.is_active ?? true,
//                 sort_order: Number(initialData.sort_order ?? 0),
//                 attribute_values: initialData.attribute_values ?? [],
//             });
//         }
//     }, [initialData, reset]);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
//                 <div className="border-b bg-muted/20 px-6 py-4">
//                     <h2 className="text-base font-semibold">Variant Information</h2>
//                     <p className="mt-1 text-sm text-muted-foreground">
//                         Define the variant identity, pricing and stock.
//                     </p>
//                 </div>

//                 <div className="grid gap-5 p-6 md:grid-cols-2">
//                     <div className="space-y-2 md:col-span-2">
//                         <label className="text-sm font-medium">Variant Name *</label>
//                         <Input placeholder="Realme P1 5g - Black - 128GB" {...register("name")} />
//                         {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">SKU *</label>
//                         <Input placeholder="realme-p1-5g-BLK-128" {...register("sku")} />
//                         {errors.sku && <p className="text-sm text-destructive">{errors.sku.message}</p>}
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Sort Order</label>
//                         <Input type="number" min="0" {...register("sort_order")} />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Price *</label>
//                         <Input type="number" min="0" step="0.01" {...register("price")} />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Compare Price</label>
//                         <Input type="number" min="0" step="0.01" {...register("compare_price")} />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Cost Price</label>
//                         <Input type="number" min="0" step="0.01" {...register("cost_price")} />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Stock Quantity *</label>
//                         <Input type="number" min="0" {...register("stock_quantity")} />
//                     </div>

//                     <div className="space-y-2">
//                         <label className="text-sm font-medium">Low Stock Threshold *</label>
//                         <Input type="number" min="0" {...register("low_stock_threshold")} />
//                     </div>

//                     <div className="md:col-span-2 space-y-3">
//                         <label className="text-sm font-medium">Attribute Values</label>
//                         <Controller
//                             name="attribute_values"
//                             control={control}
//                             render={({ field }) => (
//                                 <div className="grid gap-3 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-3">
//                                     {attributes.map((attribute) => {
//                                         const checked = field.value.includes(attribute.uuid);
//                                         return (
//                                             <label key={attribute.uuid} className="flex items-center gap-2 text-sm">
//                                                 <Checkbox
//                                                     checked={checked}
//                                                     onCheckedChange={(value) => {
//                                                         field.onChange(
//                                                             value
//                                                                 ? [...field.value, attribute.uuid]
//                                                                 : field.value.filter((id) => id !== attribute.uuid)
//                                                         );
//                                                     }}
//                                                 />
//                                                 {attribute.label}
//                                             </label>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         />
//                     </div>

//                     <Controller
//                         name="is_active"
//                         control={control}
//                         render={({ field }) => (
//                             <label className="flex items-center gap-2 text-sm">
//                                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                                 Active
//                             </label>
//                         )}
//                     />

//                     <Controller
//                         name="is_default"
//                         control={control}
//                         render={({ field }) => (
//                             <label className="flex items-center gap-2 text-sm">
//                                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                                 Default variant
//                             </label>
//                         )}
//                     />
//                 </div>
//             </section>

//             <div className="flex justify-end gap-3">
//                 {onCancel && (
//                     <Button type="button" variant="outline" disabled={loading} onClick={onCancel}>
//                         Cancel
//                     </Button>
//                 )}
//                 <Button type="submit" disabled={loading}>
//                     {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Variant" : "Create Variant")}
//                 </Button>
//             </div>
//         </form>
//     );
// }


import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
    productVariantSchema,
    type ProductVariantFormData,
} from "../validation/product-variant.schema";

interface AttributeOption {
    uuid: string;
    label: string;
}

interface Props {
    mode?: "create" | "edit";
    initialData?: Partial<ProductVariantFormData>;
    attributes?: AttributeOption[];
    attributesLoading?: boolean;
    loading?: boolean;
    serverErrors?: Record<string, string[] | string>;
    serverMessage?: string;
    onSubmit: (data: ProductVariantFormData) => void | Promise<void>;
    onCancel?: () => void;
}

export default function ProductVariantForm({
    mode = "create",
    initialData,
    attributes = [],
    attributesLoading = false,
    loading = false,
    serverErrors = {},
    serverMessage,
    onSubmit,
    onCancel,
}: Props) {
    const isEdit = mode === "edit";

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductVariantFormData>({
        resolver: zodResolver(productVariantSchema) as never,
        defaultValues: {
            name: "",
            sku: "",
            price: 0,
            compare_price: undefined,
            cost_price: undefined,
            stock_quantity: 0,
            low_stock_threshold: 5,
            is_default: false,
            is_active: true,
            sort_order: 0,
            attribute_values: [],
        },
    });

    useEffect(() => {
        if (!initialData) {
            return;
        }

        reset({
            name: initialData.name ?? "",
            sku: initialData.sku ?? "",
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
            is_default: initialData.is_default ?? false,
            is_active: initialData.is_active ?? true,
            sort_order: Number(initialData.sort_order ?? 0),
            attribute_values: (initialData.attribute_values ?? []).map(String),
        });
    }, [initialData, reset]);

    const getServerError = (field: string) => {
        const value = serverErrors[field];

        if (!value) {
            return undefined;
        }

        return Array.isArray(value) ? value[0] : value;
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

            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="border-b bg-muted/20 px-6 py-4">
                    <h2 className="text-base font-semibold">
                        Variant Information
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Define the variant identity, pricing, stock and attributes.
                    </p>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                            Variant Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                            placeholder="Realme P1 5g - Black - 128GB"
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
                        <label className="text-sm font-medium">
                            SKU <span className="text-destructive">*</span>
                        </label>
                        <Input
                            placeholder="realme-p1-5g-BLK-128"
                            {...register("sku")}
                        />
                        {errors.sku && (
                            <p className="text-sm text-destructive">
                                {errors.sku.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Sort Order
                        </label>
                        <Input
                            type="number"
                            min="0"
                            {...register("sort_order")}
                        />
                    </div>

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
                        {errors.price && (
                            <p className="text-sm text-destructive">
                                {errors.price.message}
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Stock Quantity <span className="text-destructive">*</span>
                        </label>
                        <Input
                            type="number"
                            min="0"
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
                            {...register("low_stock_threshold")}
                        />
                    </div>

                    {/* Attribute Values */}
                    <div className="space-y-3 md:col-span-2">
                        <div>
                            <label className="text-sm font-medium">
                                Attribute Values
                            </label>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Select the attribute values that define this variant.
                            </p>
                        </div>

                        <Controller
                            name="attribute_values"
                            control={control}
                            render={({ field }) => {
                                const selected = (field.value ?? []).map(String);

                                return (
                                    <div className="rounded-lg border p-4">
                                        {attributesLoading ? (
                                            <p className="text-sm text-muted-foreground">
                                                Loading attribute values...
                                            </p>
                                        ) : attributes.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                No attribute values available.
                                            </p>
                                        ) : (
                                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                {attributes.map((attribute) => {
                                                    const attributeUuid = String(attribute.uuid);
                                                    const checked = selected.includes(
                                                        attributeUuid
                                                    );

                                                    return (
                                                        <label
                                                            key={attributeUuid}
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
                                                                                  attributeUuid,
                                                                              ])
                                                                          )
                                                                        : current.filter(
                                                                              (id) =>
                                                                                  id !== attributeUuid
                                                                          );

                                                                    field.onChange(next);
                                                                }}
                                                            />
                                                            <span>{attribute.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        />

                        {errors.attribute_values && (
                            <p className="text-sm text-destructive">
                                {errors.attribute_values.message}
                            </p>
                        )}

                        {getServerError("attribute_values") && (
                            <p className="text-sm text-destructive">
                                {getServerError("attribute_values")}
                            </p>
                        )}
                    </div>

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
                        name="is_default"
                        control={control}
                        render={({ field }) => (
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(value) =>
                                        field.onChange(Boolean(value))
                                    }
                                />
                                Default variant
                            </label>
                        )}
                    />
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
                          ? "Update Variant"
                          : "Create Variant"}
                </Button>
            </div>
        </form>
    );
}
