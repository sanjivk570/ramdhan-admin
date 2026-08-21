import { useNavigate } from "react-router-dom";

import ShipmentForm from "../components/ShipmentForm";
import { useCreateShipment } from "../hooks/useShipmentMutations";
import type { ShipmentFormData } from "../validation/shipment.schema";
import type { CreateShipmentPayload } from "../types/shipment";

import { ROUTES } from "@/app/router/route-paths";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";
import { notification } from "@/lib/notification";

export default function CreateShipmentPage() {
    const navigate = useNavigate();
    const create = useCreateShipment();

    const handleSubmit = async (data: ShipmentFormData) => {
        const payload: CreateShipmentPayload = {
            order_uuid: data.order_uuid,
            carrier: data.carrier,
            ...(data.service
                ? { service: data.service }
                : {}),
            ...(data.tracking_number
                ? { tracking_number: data.tracking_number }
                : {}),
            ...(data.tracking_url ? { tracking_url: data.tracking_url } : {}),
        };

        try {
            await create.mutateAsync(payload);
            notification.success(
                "Shipment created successfully.",
                "The shipment has been created."
            );
            navigate(ROUTES.SHIPMENTS);
        } catch {
            notification.error(
                "Unable to create shipment.",
                "Please check the form and try again."
            );
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create Shipment
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Create a new shipment for an order.
                </p>
            </div>

            <ShipmentForm
                onSubmit={handleSubmit}
                loading={create.isPending}
                serverErrors={getApiFieldErrors(create.error)}
                serverMessage={getApiErrorMessage(create.error)}
                onCancel={() => navigate(ROUTES.SHIPMENTS)}
            />
        </div>
    );
}