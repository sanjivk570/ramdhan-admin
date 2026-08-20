import { ArrowLeft, Plus, Minus, RefreshCcw } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { DataTable, useDataTable } from "@/components/data-table";

import { useInventory } from "../hooks/useInventory";

import { useInventoryStockIn } from "../hooks/useInventoryStockIn";

import { useInventoryStockOut } from "../hooks/useInventoryStockOut";

import { useInventoryAdjustment } from "../hooks/useInventoryAdjustment";

import { useInventoryTransactions } from "../hooks/useInventoryTransactions";

import { transactionTableConfig } from "../config/transaction-table-config";

import InventorySummary from "../components/InventorySummary";

import InventoryActionForm, {
  type InventoryAction,
} from "../components/InventoryActionForm";

import { notification } from "@/lib/notification";

import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import { ROUTES } from "@/app/router/route-paths";

interface FormDataValues {
  quantity: number;
  type?: string;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
}

export default function InventoryDetailsPage() {
  const navigate = useNavigate();

  const { uuid } = useParams<{
    uuid: string;
  }>();

  const { data: inventory, isLoading, isError } = useInventory(uuid);

  const stockIn = useInventoryStockIn();

  const stockOut = useInventoryStockOut();

  const adjustment = useInventoryAdjustment();

  const transactionTable = useDataTable({
    storageKey: `inventory-transactions-${uuid}`,
  });

  const { data: transactions, isLoading: transactionsLoading } =
    useInventoryTransactions(uuid, transactionTable.query as any);

  const [action, setAction] = useState<InventoryAction | null>(null);

  const meta = transactions?.meta
    ? {
        ...transactions.meta,

        from:
          transactions.meta.total === 0
            ? 0
            : (transactions.meta.current_page - 1) *
                transactions.meta.per_page +
              1,

        to: Math.min(
          transactions.meta.current_page * transactions.meta.per_page,

          transactions.meta.total
        ),
      }
    : undefined;

  if (!uuid) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Invalid Inventory</h1>

        <p className="text-sm text-muted-foreground">
          Inventory UUID is missing.
        </p>

        <Button variant="outline" onClick={() => navigate(ROUTES.INVENTORY)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inventory
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Inventory Details</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Loading inventory information...
          </p>
        </div>

        <div
          className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                "
        >
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !inventory) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Inventory Not Found</h1>

        <p className="text-sm text-destructive">Unable to load inventory.</p>

        <Button variant="outline" onClick={() => navigate(ROUTES.INVENTORY)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    );
  }

  const handleActionSubmit = async (data: FormDataValues) => {
    try {
      if (action === "stock-in") {
        await stockIn.mutateAsync({
          uuid,

          data: {
            quantity: Number(data.quantity),

            type: data.type || "purchase",

            reference_type: data.reference_type || undefined,

            reference_id: data.reference_id || undefined,

            notes: data.notes || undefined,
          },
        });

        notification.success(
          "Stock added successfully.",
          "Inventory quantity has been updated."
        );
      }

      if (action === "stock-out") {
        await stockOut.mutateAsync({
          uuid,

          data: {
            quantity: Number(data.quantity),

            type: data.type || "sale",

            reference_type: data.reference_type || undefined,

            reference_id: data.reference_id || undefined,

            notes: data.notes || undefined,
          },
        });

        notification.success(
          "Stock removed successfully.",
          "Inventory quantity has been updated."
        );
      }

      if (action === "adjustment") {
        await adjustment.mutateAsync({
          uuid,

          data: {
            quantity: Number(data.quantity),

            notes: data.notes || undefined,
          },
        });

        notification.success(
          "Stock adjusted successfully.",
          "Inventory quantity has been updated."
        );
      }

      setAction(null);
    } catch {
      notification.error(
        "Inventory update failed.",
        "Please check the entered information and try again."
      );
    }
  };

  const mutationLoading =
    stockIn.isPending || stockOut.isPending || adjustment.isPending;

  const mutationError = stockIn.error || stockOut.error || adjustment.error;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Inventory Details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage stock and inventory transactions.
          </p>
        </div>

        <div
          className="
                    flex
                    flex-wrap
                    gap-2
                "
        >
          <Button variant="outline" onClick={() => navigate(ROUTES.INVENTORY)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={() => setAction("stock-in")}>
            <Plus className="mr-2 h-4 w-4" />
            Stock In
          </Button>

          <Button variant="outline" onClick={() => setAction("stock-out")}>
            <Minus className="mr-2 h-4 w-4" />
            Stock Out
          </Button>

          <Button variant="secondary" onClick={() => setAction("adjustment")}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Adjust
          </Button>
        </div>
      </div>

      {/* Product */}

      <div
        className="
                rounded-xl
                border
                bg-card
                p-6
                shadow-sm
            "
      >
        <div
          className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
        >
          <div>
            <p className="text-sm text-muted-foreground">Product</p>

            <h2 className="mt-1 text-lg font-semibold">
              {inventory.product?.name || "-"}
            </h2>

            {inventory.product_variant && (
              <p className="mt-1 text-sm text-muted-foreground">
                Variant: {inventory.product_variant.name}
              </p>
            )}
          </div>

          <Badge variant={inventory.is_active ? "default" : "secondary"}>
            {inventory.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Summary */}

      <InventorySummary inventory={inventory} />

      {/* Transaction History */}

      <DataTable
        config={transactionTableConfig()}
        table={transactionTable as any}
        rows={transactions?.data ?? []}
        meta={meta}
        loading={transactionsLoading}
        emptyState={{
          title: "No transactions found",

          description: "No inventory transactions have been recorded yet.",
        }}
      />

      {/* Action Dialog */}

      <AlertDialog
        open={action !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAction(null);
          }
        }}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {action === "stock-in"
                ? "Add Stock"
                : action === "stock-out"
                ? "Remove Stock"
                : "Adjust Stock"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {action === "stock-in"
                ? "Record incoming inventory."
                : action === "stock-out"
                ? "Record outgoing inventory."
                : "Update inventory based on physical stock count."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <InventoryActionForm
            action={action ?? "stock-in"}
            loading={mutationLoading}
            serverErrors={getApiFieldErrors(mutationError)}
            serverMessage={getApiErrorMessage(mutationError)}
            onSubmit={handleActionSubmit}
            onCancel={() => setAction(null)}
          />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutationLoading}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
