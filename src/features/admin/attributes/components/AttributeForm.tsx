import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  attributeSchema,
  type AttributeFormData,
} from "../validation/attribute.schema";
export default function AttributeForm({
  mode = "create",
  initialData,
  loading = false,
  serverErrors = {},
  serverMessage,
  onSubmit,
  onCancel,
}: {
  mode?: "create" | "edit";
  initialData?: Partial<AttributeFormData>;
  loading?: boolean;
  serverErrors?: Record<string, string[] | string>;
  serverMessage?: string;
  onSubmit: (d: AttributeFormData) => void | Promise<void>;
  onCancel?: () => void;
}) {
  const edit = mode === "edit";
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema) as never,
    defaultValues: {
      name: "",
      slug: "",
      type: "select",
      sort_order: 0,
      is_active: true,
    },
  });
  useEffect(() => {
    if (initialData)
      reset({
        name: initialData.name ?? "",
        slug: initialData.slug ?? "",
        type: initialData.type ?? "select",
        sort_order: initialData.sort_order ?? 0,
        is_active: initialData.is_active ?? true,
      });
  }, [initialData, reset]);
  const err = (f: string) => {
    const x = serverErrors[f];
    return x ? (Array.isArray(x) ? x[0] : x) : null;
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
          <h2 className="text-base font-semibold">Attribute Information</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {edit
              ? "Update the product attribute configuration."
              : "Create an attribute for product variants."}
          </p>
        </div>
        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Field label="Name" error={errors.name?.message || err("name")}>
            <Input placeholder="e.g. Color" {...register("name")} />
          </Field>
          <Field label="Slug" error={errors.slug?.message || err("slug")}>
            <Input
              placeholder="e.g. color"
              className="font-mono"
              {...register("slug")}
            />
          </Field>
          <Field label="Type" error={errors.type?.message || err("type")}>
            <Select
              value={watch("type")}
              onValueChange={(v) =>
                setValue("type", v ?? "", { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="Sort Order"
            error={errors.sort_order?.message || err("sort_order")}
          >
            <Input
              type="number"
              min={0}
              {...register("sort_order", { valueAsNumber: true })}
            />
          </Field>
          <Field label="Status">
            <Select
              value={watch("is_active") ? "1" : "0"}
              onValueChange={(v) =>
                setValue("is_active", v === "1", { shouldValidate: true })
              }
            >
              <SelectTrigger className="max-w-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>
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
            ? edit
              ? "Updating..."
              : "Creating..."
            : edit
            ? "Update Attribute"
            : "Create Attribute"}
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
