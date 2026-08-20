import { useState } from "react";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ROUTES } from "@/app/router/route-paths";
import { formatDateTime } from "@/lib/date";
import { notification } from "@/lib/notification";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";
import { useAttribute } from "../hooks/useAttribute";
import {
  useCreateAttributeValue,
  useDeleteAttributeValue,
} from "../hooks/useAttributeMutations";
import AttributeValueForm from "../components/AttributeValueForm";
import type { AttributeValue } from "../types/attribute";
import type { AttributeValueFormData } from "../validation/attribute.schema";
export default function AttributeDetailsPage() {
  const nav = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const q = useAttribute(uuid);
  const [open, setOpen] = useState(false);
  const [deleteValue, setDeleteValue] = useState<AttributeValue | null>(null);
  const create = useCreateAttributeValue(uuid ?? "");
  const del = useDeleteAttributeValue(uuid ?? "");
  if (q.isLoading)
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Loading attribute...
      </div>
    );
  if (q.isError || !q.data)
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Attribute Details</h1>
        <p className="text-sm text-destructive">Attribute not found.</p>
        <Button variant="outline" onClick={() => nav(ROUTES.ATTRIBUTES)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    );
  const a = q.data;
  const values = a.values ?? [];
  const submit = async (d: AttributeValueFormData) => {
    try {
      await create.mutateAsync({
        ...d,
        display_value: d.display_value || undefined,
      });
      setOpen(false);
      notification.success(
        "Attribute value added successfully.",
        "The value has been added."
      );
    } catch {
      notification.error(
        "Unable to add attribute value.",
        "Please check the form and try again."
      );
    }
  };
  const confirmDelete = () => {
    if (!deleteValue || !uuid) return;
    del.mutate(deleteValue.uuid, {
      onSuccess: () => {
        setDeleteValue(null);
        notification.success(
          "Attribute value deleted successfully.",
          "The value has been removed."
        );
      },
      onError: () =>
        notification.error(
          "Unable to delete attribute value.",
          "Please try again."
        ),
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Attribute Details
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the attribute and its allowed variant values.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => nav(ROUTES.ATTRIBUTES)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => nav(`${ROUTES.ATTRIBUTES}/${a.uuid}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="border-b bg-muted/20 px-6 py-4">
          <h2 className="text-base font-semibold">Attribute Information</h2>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <Info label="Name" value={a.name} />
          <Info label="Slug" value={a.slug} mono />
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <div className="mt-1">
              <Badge variant="outline" className="capitalize">
                {a.type}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <div className="mt-1">
              <Badge variant={a.is_active ? "default" : "secondary"}>
                {a.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <Info label="Sort Order" value={String(a.sort_order)} />
          <Info label="Created At" value={formatDateTime(a.created_at)} />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b bg-muted/20 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold">Attribute Values</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Values available for product variants.
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Value
          </Button>
        </div>
        <div className="p-6">
          {values.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm font-medium">No attribute values found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="px-3 py-3">Value</th>
                    <th className="px-3 py-3">Slug</th>
                    <th className="px-3 py-3">Display</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Sort</th>
                    <th className="px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {values.map((v) => (
                    <tr key={v.uuid} className="border-b last:border-0">
                      <td className="px-3 py-3 font-medium">{v.value}</td>
                      <td className="px-3 py-3 font-mono text-xs">{v.slug}</td>
                      <td className="px-3 py-3">{v.display_value || "-"}</td>
                      <td className="px-3 py-3">
                        <Badge variant={v.is_active ? "default" : "secondary"}>
                          {v.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-3 py-3">{v.sort_order}</td>
                      <td className="px-3 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteValue(v)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">Attribute UUID</p>
        <p className="mt-1 break-all font-mono text-sm">{a.uuid}</p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Add Attribute Value</DialogTitle>
            <DialogDescription>
              Add an allowed value for {a.name}.
            </DialogDescription>
          </DialogHeader>
          <AttributeValueForm
            loading={create.isPending}
            serverErrors={getApiFieldErrors(create.error)}
            serverMessage={getApiErrorMessage(create.error)}
            onSubmit={submit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleteValue}
        onOpenChange={(o) => !o && setDeleteValue(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Attribute Value?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {deleteValue?.value}
              </span>
              ?
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
    </div>
  );
}
function Info({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-medium ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}
