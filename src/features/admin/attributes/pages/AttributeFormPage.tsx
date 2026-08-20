import { useNavigate, useParams } from "react-router-dom";
import { useAttribute } from "../hooks/useAttribute";
import {
  useCreateAttribute,
  useUpdateAttribute,
} from "../hooks/useAttributeMutations";
import AttributeForm from "../components/AttributeForm";
import type { AttributeFormData } from "../validation/attribute.schema";
import { ROUTES } from "@/app/router/route-paths";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api-error";
import { notification } from "@/lib/notification";
export default function AttributeFormPage() {
  const nav = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const edit = !!uuid;
  const q = useAttribute(uuid);
  const create = useCreateAttribute();
  const update = useUpdateAttribute();
  const submit = async (d: AttributeFormData) => {
    try {
      if (uuid) {
        await update.mutateAsync({ uuid, data: d });
        notification.success(
          "Attribute updated successfully.",
          "The attribute has been updated."
        );
      } else {
        await create.mutateAsync(d);
        notification.success(
          "Attribute created successfully.",
          "The attribute has been created."
        );
      }
      nav(ROUTES.ATTRIBUTES);
    } catch {
      notification.error(
        edit ? "Unable to update attribute." : "Unable to create attribute.",
        "Please check the form and try again."
      );
    }
  };
  if (edit && q.isLoading)
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Loading attribute...
      </div>
    );
  if (edit && (q.isError || !q.data))
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Attribute Not Found</h1>
        <p className="text-sm text-muted-foreground">
          Unable to load the requested attribute.
        </p>
        <ButtonBack onClick={() => nav(ROUTES.ATTRIBUTES)} />
      </div>
    );
  const m = edit ? update : create;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {edit ? "Edit Attribute" : "Create Attribute"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {edit
            ? "Update attribute configuration."
            : "Create a new product attribute."}
        </p>
      </div>
      <AttributeForm
        mode={edit ? "edit" : "create"}
        initialData={
          q.data
            ? {
                name: q.data.name,
                slug: q.data.slug,
                type: q.data.type,
                sort_order: q.data.sort_order,
                is_active: Boolean(q.data.is_active),
              }
            : undefined
        }
        loading={m.isPending}
        serverErrors={getApiFieldErrors(m.error)}
        serverMessage={getApiErrorMessage(m.error)}
        onSubmit={submit}
        onCancel={() => nav(ROUTES.ATTRIBUTES)}
      />
    </div>
  );
}
function ButtonBack({ onClick }: { onClick: () => void }) {
  return (
    <button className="rounded-md border px-4 py-2 text-sm" onClick={onClick}>
      Back to Attributes
    </button>
  );
}
