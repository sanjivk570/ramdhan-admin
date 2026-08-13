import { useNavigate, useParams } from "react-router-dom";

import UnitForm from "../components/UnitForm";

import { useUnit } from "../hooks/useUnit";

import { useUpdateUnit } from "../hooks/useUpdateUnit";

import type { UnitFormData } from "../validation/unit.schema";

import type { UpdateUnitPayload } from "../types/unit";

import { ROUTES } from "@/app/router/route-paths";

import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";

import { notification } from "@/lib/notification";

export default function EditUnitPage() {
  const navigate = useNavigate();

  const { uuid } = useParams<{
    uuid: string;
  }>();

  const {
    data: unit,

    isLoading,

    isError,
  } = useUnit(uuid);

  const updateUnit = useUpdateUnit();

  const handleSubmit = async (data: UnitFormData) => {
    if (!uuid) {
      return;
    }

    const payload: UpdateUnitPayload = {
      name: data.name.trim(),

      code: data.code.trim(),

      symbol: data.symbol.trim(),

      decimal_places: data.decimal_places,

      is_active: data.is_active,

      sort_order: data.sort_order,
    };

    try {
      await updateUnit.mutateAsync({
        uuid,
        data: payload,
      });

      notification.success(
        "Unit updated successfully.",
        "The unit information has been updated."
      );

      navigate(ROUTES.UNITS);
    } catch {
      notification.error(
        "Unable to update unit.",
        "Please check the form and try again."
      );
    }
  };

  if (!uuid) {
    return (
      <div
        className="
                space-y-4
            "
      >
        <h1
          className="
                    text-2xl
                    font-semibold
                "
        >
          Invalid Unit
        </h1>

        <p
          className="
                    text-sm
                    text-muted-foreground
                "
        >
          Unit UUID is missing.
        </p>

        <button
          type="button"
          onClick={() => navigate(ROUTES.UNITS)}
          className="
                        rounded-md
                        border
                        px-4
                        py-2
                        text-sm
                    "
        >
          Back to Units
        </button>
      </div>
    );
  }

  if (isLoading) {
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
                    "
          >
            Edit Unit
          </h1>

          <p
            className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    "
          >
            Loading unit information...
          </p>
        </div>

        <div
          className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    text-sm
                    text-muted-foreground
                "
        >
          Loading unit...
        </div>
      </div>
    );
  }

  if (isError || !unit) {
    return (
      <div
        className="
                space-y-4
            "
      >
        <h1
          className="
                    text-2xl
                    font-semibold
                "
        >
          Unit Not Found
        </h1>

        <p
          className="
                    text-sm
                    text-muted-foreground
                "
        >
          Unable to load the requested unit.
        </p>

        <button
          type="button"
          onClick={() => navigate(ROUTES.UNITS)}
          className="
                        rounded-md
                        border
                        px-4
                        py-2
                        text-sm
                    "
        >
          Back to Units
        </button>
      </div>
    );
  }

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
          Edit Unit
        </h1>

        <p
          className="
                    mt-1
                    text-sm
                    text-muted-foreground
                "
        >
          Update unit information.
        </p>
      </div>

      <UnitForm
        mode="edit"
        initialData={{
          name: unit.name,

          code: unit.code,

          symbol: unit.symbol,

          decimal_places: unit.decimal_places,

          is_active: Boolean(unit.is_active),

          sort_order: unit.sort_order,
        }}
        onSubmit={handleSubmit}
        loading={updateUnit.isPending}
        serverErrors={getApiFieldErrors(updateUnit.error)}
        serverMessage={getApiErrorMessage(updateUnit.error)}
        onCancel={() => navigate(ROUTES.UNITS)}
      />
    </div>
  );
}
