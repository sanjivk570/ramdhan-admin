import { ArrowLeft, Pencil } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useUnit } from "../hooks/useUnit";

import UnitStatusBadge from "../components/UnitStatusBadge";

import { formatDateTime } from "@/lib/date";

import { ROUTES } from "@/app/router/route-paths";

export default function UnitDetailsPage() {
  const navigate = useNavigate();

  const { uuid } = useParams<{
    uuid: string;
  }>();

  const {
    data: unit,

    isLoading,

    isError,
  } = useUnit(uuid);

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
            Unit Details
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
                    shadow-sm
                "
        >
          Loading...
        </div>
      </div>
    );
  }

  if (isError || !unit) {
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
            Unit Details
          </h1>

          <p
            className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    "
          >
            Unable to load unit information.
          </p>
        </div>

        <div
          className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    shadow-sm
                "
        >
          <p
            className="
                        text-sm
                        text-destructive
                    "
          >
            Unit not found or something went wrong.
          </p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate(ROUTES.UNITS)}
          >
            <ArrowLeft
              className="
                            mr-2
                            h-4
                            w-4
                        "
            />
            Back to Units
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
            space-y-6
        "
    >
      {/* Header */}

      <div
        className="
                flex
                items-center
                justify-between
                gap-4
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
            Unit Details
          </h1>

          <p
            className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    "
          >
            View unit information.
          </p>
        </div>

        <div
          className="
                    flex
                    items-center
                    gap-2
                "
        >
          <Button variant="outline" onClick={() => navigate(ROUTES.UNITS)}>
            <ArrowLeft
              className="
                            mr-2
                            h-4
                            w-4
                        "
            />
            Back
          </Button>

          <Button onClick={() => navigate(`${ROUTES.UNITS}/${unit.uuid}/edit`)}>
            <Pencil
              className="
                            mr-2
                            h-4
                            w-4
                        "
            />
            Edit
          </Button>
        </div>
      </div>

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
            Measurement unit information.
          </p>
        </div>

        <div
          className="
                    grid
                    gap-6
                    p-6
                    md:grid-cols-2
                "
        >
          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Name
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {unit.name || "-"}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Code
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {unit.code || "-"}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Symbol
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {unit.symbol || "-"}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Decimal Places
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {unit.decimal_places}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Sort Order
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {unit.sort_order}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Status
            </p>

            <div className="mt-1">
              <UnitStatusBadge isActive={Boolean(unit.is_active)} />
            </div>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Created At
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {formatDateTime(unit.created_at)}
            </p>
          </div>

          <div>
            <p
              className="
                            text-sm
                            text-muted-foreground
                        "
            >
              Updated At
            </p>

            <p
              className="
                            mt-1
                            text-sm
                            font-medium
                        "
            >
              {formatDateTime(unit.updated_at)}
            </p>
          </div>
        </div>
      </div>

      {/* UUID */}

      <div
        className="
                rounded-xl
                border
                bg-card
                p-6
                shadow-sm
            "
      >
        <p
          className="
                    text-sm
                    text-muted-foreground
                "
        >
          Unit UUID
        </p>

        <p
          className="
                    mt-1
                    break-all
                    font-mono
                    text-sm
                "
        >
          {unit.uuid}
        </p>
      </div>
    </div>
  );
}
