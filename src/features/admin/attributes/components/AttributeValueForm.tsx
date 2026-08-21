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
  attributeValueSchema,
  type AttributeValueFormData,
} from "../validation/attribute.schema";
export default function AttributeValueForm({
  loading = false,
  serverErrors = {},
  serverMessage,
  onSubmit,
  onCancel,
}: {
  loading?: boolean;
  serverErrors?: Record<string, string[] | string>;
  serverMessage?: string;
  onSubmit: (d: AttributeValueFormData) => void | Promise<void>;
  onCancel?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AttributeValueFormData>({
    resolver: zodResolver(attributeValueSchema) as never,
    defaultValues: {
      value: "",
      slug: "",
      display_value: "",
      sort_order: 0,
      is_active: true,
    },
  });
  const err = (f: string) => {
    const x = serverErrors[f];
    return x ? (Array.isArray(x) ? x[0] : x) : null;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverMessage && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverMessage}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Value" error={errors.value?.message || err("value")}>
          <Input placeholder="e.g. Black" {...register("value")} />
        </Field>
        <Field label="Slug" error={errors.slug?.message || err("slug")}>
          <Input
            placeholder="e.g. black"
            className="font-mono"
            {...register("slug")}
          />
        </Field>
        <Field label="Display Value">
          <Input
            placeholder="e.g. #000000 or Black"
            {...register("display_value")}
          />
        </Field>
        <Field label="Sort Order">
          <Input
            type="number"
            min={0}
            {...register("sort_order", { valueAsNumber: true })}
          />
        </Field>
        <Field label="Status">
          <Select
            value={watch("is_active") ? "1" : "0"}
            onValueChange={(v) => setValue("is_active", v === "1")}
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
          {loading ? "Creating..." : "Add Value"}
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
