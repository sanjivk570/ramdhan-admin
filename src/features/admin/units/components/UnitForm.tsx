import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

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

import { unitSchema, type UnitFormData } from "../validation/unit.schema";

interface UnitFormValues {
  name: string;

  code: string;

  symbol: string;

  decimal_places: number;

  is_active: boolean;

  sort_order: number;
}

interface UnitFormProps {
  mode?: "create" | "edit";

  initialData?: Partial<UnitFormValues>;

  loading?: boolean;

  serverErrors?: Record<string, string[] | string>;

  serverMessage?: string;

  onSubmit: (data: UnitFormData) => void | Promise<void>;

  onCancel?: () => void;
}

export default function UnitForm({
  mode = "create",

  initialData,

  loading = false,

  serverErrors = {},

  serverMessage,

  onSubmit,

  onCancel,
}: UnitFormProps) {
  const isEdit = mode === "edit";

  const {
    register,

    control,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<UnitFormValues>({
    resolver: zodResolver(unitSchema) as never,

    defaultValues: {
      name: "",

      code: "",

      symbol: "",

      decimal_places: 2,

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

      symbol: initialData.symbol ?? "",

      decimal_places: initialData.decimal_places ?? 2,

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
    <form onSubmit={handleSubmit(onSubmit as never)} className="space-y-6">
      {serverMessage && (
        <div
          className="
                    rounded-lg
                    border
                    border-destructive/30
                    bg-destructive/10
                    px-4
                    py-3
                    text-sm
                    text-destructive
                "
        >
          {serverMessage}
        </div>
      )}

      {/* Basic Information */}

      <div
        className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            "
      >
        <div
          className="
                    border-b
                    bg-muted/20
                    px-6
                    py-4
                "
        >
          <h2
            className="
                        text-base
                        font-semibold
                    "
          >
            Basic Information
          </h2>

          <p
            className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    "
          >
            {isEdit
              ? "Update unit information."
              : "Enter the unit information."}
          </p>
        </div>

        <div
          className="
                    grid
                    gap-5
                    p-6
                    md:grid-cols-2
                "
        >
          {/* Name */}

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="
                                text-sm
                                font-medium
                            "
            >
              Name
              <span
                className="
                                ml-1
                                text-destructive
                            "
              >
                *
              </span>
            </label>

            <Input
              id="name"
              placeholder="e.g. Kilogram"
              {...register("name")}
            />

            {errors.name && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {errors.name.message}
              </p>
            )}

            {getServerError("name") && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {getServerError("name")}
              </p>
            )}
          </div>

          {/* Code */}

          <div className="space-y-2">
            <label
              htmlFor="code"
              className="
                                text-sm
                                font-medium
                            "
            >
              Code
              <span
                className="
                                ml-1
                                text-destructive
                            "
              >
                *
              </span>
            </label>

            <Input id="code" placeholder="e.g. KG" {...register("code")} />

            {errors.code && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {errors.code.message}
              </p>
            )}

            {getServerError("code") && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {getServerError("code")}
              </p>
            )}
          </div>

          {/* Symbol */}

          <div className="space-y-2">
            <label
              htmlFor="symbol"
              className="
                                text-sm
                                font-medium
                            "
            >
              Symbol
              <span
                className="
                                ml-1
                                text-destructive
                            "
              >
                *
              </span>
            </label>

            <Input id="symbol" placeholder="e.g. kg" {...register("symbol")} />

            {errors.symbol && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {errors.symbol.message}
              </p>
            )}

            {getServerError("symbol") && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {getServerError("symbol")}
              </p>
            )}
          </div>

          {/* Decimal Places */}

          <div className="space-y-2">
            <label
              htmlFor="decimal_places"
              className="
                                text-sm
                                font-medium
                            "
            >
              Decimal Places
            </label>

            <Controller
              name="decimal_places"
              control={control}
              render={({ field }) => (
                <Input
                  id="decimal_places"
                  type="number"
                  min={0}
                  max={6}
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              )}
            />

            {errors.decimal_places && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {errors.decimal_places.message}
              </p>
            )}
          </div>

          {/* Sort Order */}

          <div className="space-y-2">
            <label
              htmlFor="sort_order"
              className="
                                text-sm
                                font-medium
                            "
            >
              Sort Order
            </label>

            <Controller
              name="sort_order"
              control={control}
              render={({ field }) => (
                <Input
                  id="sort_order"
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              )}
            />

            {errors.sort_order && (
              <p
                className="
                                text-sm
                                text-destructive
                            "
              >
                {errors.sort_order.message}
              </p>
            )}
          </div>

          {/* Status */}

          <div className="space-y-2">
            <label
              className="
                            text-sm
                            font-medium
                        "
            >
              Status
            </label>

            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? "1" : "0"}
                  onValueChange={(value) => field.onChange(value === "1")}
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
          </div>
        </div>
      </div>

      {/* Actions */}

      <div
        className="
                flex
                items-center
                justify-end
                gap-3
            "
      >
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
            ? "Update Unit"
            : "Create Unit"}
        </Button>
      </div>
    </form>
  );
}
