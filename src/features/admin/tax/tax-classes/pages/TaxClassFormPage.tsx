import { useNavigate, useParams } from "react-router-dom";

import TaxClassForm from "../components/TaxClassForm";
import { useTaxClass } from "../hooks/useTaxClass";
import {
    useCreateTaxClass,
    useUpdateTaxClass,
} from "../hooks/useTaxClassMutations";

import type { TaxClassFormData } from "../validation/tax-class.schema";

import { ROUTES } from "@/app/router/route-paths";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";
import { notification } from "@/lib/notification";

export default function TaxClassFormPage() {
    const navigate = useNavigate();

    const { uuid } = useParams<{ uuid: string }>();
    const isEdit = Boolean(uuid);

    const taxClassQuery = useTaxClass(uuid);

    const createMutation = useCreateTaxClass();
    const updateMutation = useUpdateTaxClass();

    const mutation = isEdit
        ? updateMutation
        : createMutation;

    const handleSubmit = async (
        data: TaxClassFormData
    ) => {
        try {
            if (isEdit && uuid) {
                await updateMutation.mutateAsync({
                    uuid,
                    data,
                });

                notification.success(
                    "Tax class updated successfully.",
                    "The tax class has been updated."
                );
            } else {
                await createMutation.mutateAsync(data);

                notification.success(
                    "Tax class created successfully.",
                    "The tax class has been created."
                );
            }

            navigate(ROUTES.TAX_CLASSES);
        } catch {
            notification.error(
                isEdit
                    ? "Unable to update tax class."
                    : "Unable to create tax class.",
                "Please check the form and try again."
            );
        }
    };

    if (isEdit && taxClassQuery.isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Tax Class
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading tax class information...
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                    Loading tax class...
                </div>
            </div>
        );
    }

    if (isEdit && (taxClassQuery.isError || !taxClassQuery.data)) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">
                    Tax Class Not Found
                </h1>

                <p className="text-sm text-muted-foreground">
                    Unable to load the requested tax class.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(ROUTES.TAX_CLASSES)
                    }
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    Back to Tax Classes
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {isEdit
                        ? "Edit Tax Class"
                        : "Create Tax Class"}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {isEdit
                        ? "Update tax class information."
                        : "Create a new tax class."}
                </p>
            </div>

            <TaxClassForm
                mode={isEdit ? "edit" : "create"}
                initialData={
                    isEdit && taxClassQuery.data
                        ? {
                              ...taxClassQuery.data,
                              description:
                                  taxClassQuery.data.description ?? "",
                          }
                        : undefined
                }
                loading={mutation.isPending}
                serverErrors={getApiFieldErrors(mutation.error)}
                serverMessage={getApiErrorMessage(mutation.error)}
                onSubmit={handleSubmit}
                onCancel={() =>
                    navigate(ROUTES.TAX_CLASSES)
                }
            />
        </div>
    );
}
