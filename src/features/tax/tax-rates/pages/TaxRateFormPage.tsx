import { useNavigate, useParams } from "react-router-dom";

import TaxRateForm from "../components/TaxRateForm";
import { useTaxRate } from "../hooks/useTaxRate";
import {
    useCreateTaxRate,
    useUpdateTaxRate,
} from "../hooks/useTaxRateMutations";

import { useTaxClasses } from "../../tax-classes/hooks/useTaxClasses";

import type { TaxRateFormData } from "../validation/tax-rate.schema";

import { ROUTES } from "@/app/router/route-paths";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";
import { notification } from "@/lib/notification";

export default function TaxRateFormPage() {
    const navigate = useNavigate();

    const { uuid } = useParams<{ uuid: string }>();

    const isEdit = Boolean(uuid);

    const taxRateQuery = useTaxRate(uuid);

    const taxClassesQuery = useTaxClasses({
        page: 1,
        per_page: 100,
        sort_by: "sort_order",
        sort_order: "asc",
    });

    const createMutation = useCreateTaxRate();
    const updateMutation = useUpdateTaxRate();

    const mutation = isEdit
        ? updateMutation
        : createMutation;

    const taxClassOptions =
        taxClassesQuery.data?.data?.map((item) => ({
            label: item.name,
            value: item.uuid,
        })) ?? [];

    const handleSubmit = async (
        data: TaxRateFormData
    ) => {
        const payload = {
            name: data.name,
            rate: data.rate,
            tax_class_uuid: data.tax_class_uuid,
            country_code:
                data.country_code?.trim() || undefined,
            state_code:
                data.state_code?.trim() || undefined,
            priority: data.priority,
            is_active: data.is_active,
        };

        try {
            if (isEdit && uuid) {
                await updateMutation.mutateAsync({
                    uuid,
                    data: payload,
                });

                notification.success(
                    "Tax rate updated successfully.",
                    "The tax rate has been updated."
                );
            } else {
                await createMutation.mutateAsync(payload);

                notification.success(
                    "Tax rate created successfully.",
                    "The tax rate has been created."
                );
            }

            navigate(ROUTES.TAX_RATES);
        } catch {
            notification.error(
                isEdit
                    ? "Unable to update tax rate."
                    : "Unable to create tax rate.",
                "Please check the form and try again."
            );
        }
    };

    if (isEdit && taxRateQuery.isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Tax Rate
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading tax rate information...
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
                    Loading tax rate...
                </div>
            </div>
        );
    }

    if (isEdit && (taxRateQuery.isError || !taxRateQuery.data)) {
        return (
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">
                    Tax Rate Not Found
                </h1>

                <p className="text-sm text-muted-foreground">
                    Unable to load the requested tax rate.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(ROUTES.TAX_RATES)
                    }
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    Back to Tax Rates
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {isEdit
                        ? "Edit Tax Rate"
                        : "Create Tax Rate"}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {isEdit
                        ? "Update tax rate information."
                        : "Create a new tax rate."}
                </p>
            </div>

            <TaxRateForm
                mode={isEdit ? "edit" : "create"}
                initialData={
                    isEdit
                        ? taxRateQuery.data
                        : undefined
                }
                taxClasses={taxClassOptions}
                taxClassesLoading={taxClassesQuery.isLoading}
                loading={mutation.isPending}
                serverErrors={getApiFieldErrors(mutation.error)}
                serverMessage={getApiErrorMessage(mutation.error)}
                onSubmit={handleSubmit}
                onCancel={() =>
                    navigate(ROUTES.TAX_RATES)
                }
            />
        </div>
    );
}
