import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable, useDataTable } from "@/components/data-table";

import { ROUTES } from "@/app/router/route-paths";
import { useShipments } from "../hooks/useShipments";
import { useShipShipment } from "../hooks/useShipmentMutations";
import { shipmentTableConfig } from "../config/shipment-table-config";
import { notification } from "@/lib/notification";

export default function ShipmentListPage() {
    const table = useDataTable({ storageKey: "shipments" });

    const { data, isLoading } = useShipments(table.query as any);
    const shipMutation = useShipShipment();

    const meta = data?.meta
        ? {
              ...data.meta,
              from:
                  (data.meta.current_page - 1) * data.meta.per_page + 1,
              to: Math.min(
                  data.meta.current_page * data.meta.per_page,
                  data.meta.total
              ),
          }
        : undefined;

    const config = shipmentTableConfig({
        onShip: (shipment) => {
            shipMutation.mutate(shipment.uuid, {
                onSuccess: () => {
                    notification.success(
                        "Shipment marked as shipped.",
                        "The shipment status has been updated."
                    );
                },
                onError: () => {
                    notification.error(
                        "Unable to update shipment.",
                        "Please try again."
                    );
                },
            });
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Shipments
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage and track customer shipments.
                    </p>
                </div>
                <Button>
                    <Link to={`${ROUTES.SHIPMENTS}/create`}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Shipment
                    </Link>
                </Button>
            </div>

            <DataTable
                config={config}
                table={table as any}
                rows={data?.data ?? []}
                meta={meta}
                loading={isLoading}
            />
        </div>
    );
}