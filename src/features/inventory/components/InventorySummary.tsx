import { Package, AlertTriangle, Boxes, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { InventoryStock } from "../types/inventory";

interface Props {
  inventory: InventoryStock;
}

export default function InventorySummary({ inventory }: Props) {
  const available = Math.max(
    0,
    inventory.quantity - inventory.reserved_quantity
  );

  const isLowStock = inventory.quantity <= inventory.low_stock_threshold;

  return (
    <div
      className="
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
        "
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Stock</p>

              <p className="mt-1 text-2xl font-semibold">
                {inventory.quantity}
              </p>
            </div>

            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reserved</p>

              <p className="mt-1 text-2xl font-semibold">
                {inventory.reserved_quantity}
              </p>
            </div>

            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>

              <p className="mt-1 text-2xl font-semibold">{available}</p>
            </div>

            <Boxes className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Stock Status</p>

              <p className="mt-1 text-sm font-medium">
                {isLowStock ? "Low Stock" : "Healthy"}
              </p>
            </div>

            <AlertTriangle
              className={
                isLowStock
                  ? "h-5 w-5 text-destructive"
                  : "h-5 w-5 text-muted-foreground"
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
