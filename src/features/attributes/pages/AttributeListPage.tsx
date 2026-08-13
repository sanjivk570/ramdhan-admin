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
import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";
import type { Attribute } from "../types/attribute";
import { attributeTableConfig } from "../config/attribute-table-config";
import { useAttributes } from "../hooks/useAttributes";
import {
  useDeleteAttribute,
  useUpdateAttributeStatus,
} from "../hooks/useAttributeMutations";
export default function AttributeListPage() {
  const nav = useNavigate();
  const table = useDataTable({ storageKey: "attributes" });
  const { data, isLoading } = useAttributes(table.query as any);
  const del = useDeleteAttribute();
  const status = useUpdateAttributeStatus();
  const [item, setItem] = useState<Attribute | null>(null);
  const [statusItem, setStatusItem] = useState<Attribute | null>(null);
  const [statusValue, setStatusValue] = useState<boolean | null>(null);
  const meta = data?.meta
    ? {
        ...data.meta,
        from: (data.meta.current_page - 1) * data.meta.per_page + 1,
        to: Math.min(
          data.meta.current_page * data.meta.per_page,
          data.meta.total
        ),
      }
    : undefined;
  const confirmDelete = () => {
    if (!item) return;
    del.mutate(item.uuid, {
      onSuccess: () => {
        setItem(null);
        notification.success(
          "Attribute deleted successfully.",
          "The attribute has been removed."
        );
      },
      onError: () =>
        notification.error("Unable to delete attribute.", "Please try again."),
    });
  };
  const confirmStatus = () => {
    if (!statusItem || statusValue === null) return;
    status.mutate(
      { uuid: statusItem.uuid, status: statusValue },
      {
        onSuccess: () => {
          const active = statusValue;
          setStatusItem(null);
          setStatusValue(null);
          notification.success(
            active
              ? "Attribute activated successfully."
              : "Attribute deactivated successfully.",
            active
              ? "The attribute is now active."
              : "The attribute is now inactive."
          );
        },
        onError: () =>
          notification.error(
            "Unable to update attribute status.",
            "Please try again."
          ),
      }
    );
  };
  return (
    <>
      <DataTable
        config={attributeTableConfig({
          onView: (x) => nav(`${ROUTES.ATTRIBUTES}/${x.uuid}`),
          onEdit: (x) => nav(`${ROUTES.ATTRIBUTES}/${x.uuid}/edit`),
          onDelete: setItem,
          onActivate: (x) => {
            setStatusItem(x);
            setStatusValue(true);
          },
          onDeactivate: (x) => {
            setStatusItem(x);
            setStatusValue(false);
          },
        })}
        table={table as any}
        rows={data?.data ?? []}
        meta={meta}
        loading={isLoading}
        emptyState={{
          title: "No attributes found",
          description: "Try another search or create a new attribute.",
          actionLabel: "Create Attribute",
          onAction: () => nav(`${ROUTES.ATTRIBUTES}/create`),
        }}
      >
        <Button>
          <Link to={`${ROUTES.ATTRIBUTES}/create`}>Create Attribute</Link>
        </Button>
      </DataTable>
      <AlertDialog open={!!item} onOpenChange={(o) => !o && setItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Attribute?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">{item?.name}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={del.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={del.isPending}
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="bg-destructive text-destructive-foreground"
            >
              {del.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={statusItem !== null && statusValue !== null}
        onOpenChange={(o) => {
          if (!o) {
            setStatusItem(null);
            setStatusValue(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {statusValue ? "Activate Attribute?" : "Deactivate Attribute?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {statusValue ? "activate" : "deactivate"}{" "}
              <span className="font-medium text-foreground">
                {statusItem?.name}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={status.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={status.isPending}
              onClick={confirmStatus}
            >
              {status.isPending
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
