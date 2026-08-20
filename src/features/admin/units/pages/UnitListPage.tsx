import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DataTable, useDataTable } from "@/components/data-table";

import type { Unit } from "../types/unit";

import { useUnits } from "../hooks/useUnits";

import { useDeleteUnit } from "../hooks/useDeleteUnit";

import { useUpdateUnitStatus } from "../hooks/useUpdateUnitStatus";

import { unitTableConfig } from "../config/unit-table-config";

import { notification } from "@/lib/notification";

import { ROUTES } from "@/app/router/route-paths";

export default function UnitListPage() {
  const table = useDataTable({
    storageKey: "units",
  });

  const navigate = useNavigate();

  const { data, isLoading } = useUnits(table.query as any);

  const [deleteUnit, setDeleteUnit] = useState<Unit | null>(null);

  const deleteMutation = useDeleteUnit();

  const [statusUnit, setStatusUnit] = useState<Unit | null>(null);

  const [statusValue, setStatusValue] = useState<boolean | null>(null);

  const statusMutation = useUpdateUnitStatus();

  const meta = data?.meta
    ? {
        ...data.meta,

        from:
          data.meta.total === 0
            ? 0
            : (data.meta.current_page - 1) * data.meta.per_page + 1,

        to: Math.min(
          data.meta.current_page * data.meta.per_page,
          data.meta.total
        ),
      }
    : undefined;

  const handleDelete = () => {
    if (!deleteUnit) {
      return;
    }

    deleteMutation.mutate(deleteUnit.uuid, {
      onSuccess: () => {
        notification.success(
          "Unit deleted successfully.",
          "The unit has been deleted."
        );

        setDeleteUnit(null);
      },

      onError: () => {
        notification.error("Unable to delete unit.", "Please try again.");
      },
    });
  };

  const handleStatusConfirm = () => {
    if (!statusUnit || statusValue === null) {
      return;
    }

    statusMutation.mutate(
      {
        uuid: statusUnit.uuid,

        status: statusValue,
      },

      {
        onSuccess: () => {
          notification.success(
            statusValue
              ? "Unit activated successfully."
              : "Unit deactivated successfully.",

            statusValue
              ? "The unit has been activated."
              : "The unit has been deactivated."
          );

          setStatusUnit(null);

          setStatusValue(null);
        },

        onError: () => {
          notification.error(
            "Unable to update unit status.",
            "Please try again."
          );
        },
      }
    );
  };

  return (
    <>
      <DataTable
        config={unitTableConfig({
          onView: (unit) => {
            navigate(`${ROUTES.UNITS}/${unit.uuid}`);
          },

          onEdit: (unit) => {
            navigate(`${ROUTES.UNITS}/${unit.uuid}/edit`);
          },

          onDelete: (unit) => {
            setDeleteUnit(unit);
          },

          onActivate: (unit) => {
            setStatusUnit(unit);

            setStatusValue(true);
          },

          onDeactivate: (unit) => {
            setStatusUnit(unit);

            setStatusValue(false);
          },
        })}
        table={table as any}
        rows={data?.data ?? []}
        meta={meta}
        loading={isLoading}
        emptyState={{
          title: "No units found",

          description: "Try another search or create a new unit.",

          actionLabel: "Create Unit",

          onAction: () => navigate(`${ROUTES.UNITS}/create`),
        }}
      >
        <Button>
          <Link to={`${ROUTES.UNITS}/create`}>Create Unit</Link>
        </Button>
      </DataTable>

      {/* Delete */}

      <AlertDialog
        open={Boolean(deleteUnit)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteUnit(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span
                className="
                                font-medium
                                text-foreground
                            "
              >
                {deleteUnit?.name || "this unit"}
              </span>
              ?
              <br />
              This action will remove the unit from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();

                handleDelete();
              }}
              className="
                                bg-destructive
                                text-destructive-foreground
                                hover:bg-destructive/90
                            "
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status */}

      <AlertDialog
        open={statusUnit !== null && statusValue !== null}
        onOpenChange={(open) => {
          if (!open) {
            setStatusUnit(null);

            setStatusValue(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusValue ? "Activate Unit?" : "Deactivate Unit?"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to {statusValue ? "activate" : "deactivate"}{" "}
              <span
                className="
                                font-semibold
                                text-foreground
                            "
              >
                {statusUnit?.name}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={statusMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={statusMutation.isPending}
              onClick={handleStatusConfirm}
            >
              {statusMutation.isPending
                ? "Updating..."
                : statusValue
                ? "Activate"
                : "Deactivate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
