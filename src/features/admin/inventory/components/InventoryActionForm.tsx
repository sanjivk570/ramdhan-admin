import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type InventoryAction = "stock-in" | "stock-out" | "adjustment";

interface Props {
  action: InventoryAction;

  loading?: boolean;

  serverErrors?: Record<string, string[] | string>;

  serverMessage?: string;

  onSubmit: (data: FormDataValues) => void | Promise<void>;

  onCancel?: () => void;
}

interface FormDataValues {
  quantity: number;

  type?: string;

  reference_type?: string;

  reference_id?: string;

  notes?: string;
}

const schema = z.object({
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than zero"),

  type: z.string().optional(),

  reference_type: z.string().optional(),

  reference_id: z.string().optional(),

  notes: z.string().optional(),
});

export default function InventoryActionForm({
  action,
  loading = false,
  serverErrors = {},
  serverMessage,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      quantity: 1,

      type:
        action === "stock-in"
          ? "purchase"
          : action === "stock-out"
          ? "sale"
          : undefined,

      reference_type: "",

      reference_id: "",

      notes: "",
    },
  });

  useEffect(() => {
    reset({
      quantity: 1,

      type:
        action === "stock-in"
          ? "purchase"
          : action === "stock-out"
          ? "sale"
          : undefined,

      reference_type: "",

      reference_id: "",

      notes: "",
    });
  }, [action, reset]);

  const getServerError = (field: string) => {
    const error = serverErrors[field];

    if (!error) {
      return null;
    }

    return Array.isArray(error) ? error[0] : error;
  };

  const isAdjustment = action === "adjustment";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

      {/* Quantity */}

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Quantity
          <span className="ml-1 text-destructive">*</span>
        </label>

        <Input type="number" min={1} {...register("quantity")} />

        {errors.quantity && (
          <p className="text-sm text-destructive">{errors.quantity.message}</p>
        )}

        {getServerError("quantity") && (
          <p className="text-sm text-destructive">
            {getServerError("quantity")}
          </p>
        )}
      </div>

      {/* Transaction Type */}

      {!isAdjustment && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Transaction Type
            <span className="ml-1 text-destructive">*</span>
          </label>

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {action === "stock-in" && (
                    <>
                      <SelectItem value="purchase">Purchase</SelectItem>

                      <SelectItem value="return">Return</SelectItem>
                    </>
                  )}

                  {action === "stock-out" && (
                    <>
                      <SelectItem value="sale">Sale</SelectItem>

                      <SelectItem value="damage">Damage</SelectItem>

                      <SelectItem value="cancellation">Cancellation</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      {/* Reference Type */}

      {!isAdjustment && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Reference Type</label>

          <Input
            placeholder={action === "stock-in" ? "purchase_order" : "order"}
            {...register("reference_type")}
          />
        </div>
      )}

      {/* Reference ID */}

      {!isAdjustment && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Reference ID</label>

          <Input
            placeholder={action === "stock-in" ? "PO-10001" : "ORD-10001"}
            {...register("reference_id")}
          />
        </div>
      )}

      {/* Notes */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>

        <Textarea
          rows={4}
          placeholder="Enter notes..."
          {...register("notes")}
        />
      </div>

      {/* Actions */}

      <div
        className="
                flex
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
            ? "Processing..."
            : action === "stock-in"
            ? "Stock In"
            : action === "stock-out"
            ? "Stock Out"
            : "Adjust Stock"}
        </Button>
      </div>
    </form>
  );
}
