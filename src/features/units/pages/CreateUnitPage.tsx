import { useNavigate } from "react-router-dom";

import UnitForm from "../components/UnitForm";

import { useCreateUnit } from "../hooks/useCreateUnit";

import type { UnitFormData } from "../validation/unit.schema";

import type { CreateUnitPayload } from "../types/unit";

import { ROUTES } from "@/app/router/route-paths";

import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import { notification } from "@/lib/notification";

export default function CreateUnitPage() {
  const navigate = useNavigate();

  const createUnit = useCreateUnit();

  const handleSubmit = async (data: UnitFormData) => {
    const payload: CreateUnitPayload = {
      name: data.name.trim(),

      code: data.code.trim(),

      symbol: data.symbol.trim(),

      decimal_places: data.decimal_places,

      is_active: data.is_active,

      sort_order: data.sort_order,
    };

    try {
      await createUnit.mutateAsync(payload);

      notification.success(
        "Unit created successfully.",
        "The unit has been created."
      );

      navigate(ROUTES.UNITS);
    } catch {
      notification.error(
        "Unable to create unit.",
        "Please check the form and try again."
      );
    }
  };

  return (
    <div
      className="
            space-y-6
        "
    >
      <div>
        <h1
          className="
                    text-2xl
                    font-semibold
                    tracking-tight
                "
        >
          Create Unit
        </h1>

        <p
          className="
                    mt-1
                    text-sm
                    text-muted-foreground
                "
        >
          Create a new measurement unit.
        </p>
      </div>

      <UnitForm
        onSubmit={handleSubmit}
        loading={createUnit.isPending}
        serverErrors={getApiFieldErrors(createUnit.error)}
        serverMessage={getApiErrorMessage(createUnit.error)}
        onCancel={() => navigate(ROUTES.UNITS)}
      />
    </div>
  );
}
