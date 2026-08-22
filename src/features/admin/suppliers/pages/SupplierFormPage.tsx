import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { ROUTES } from "@/app/router/route-paths";
import { notification } from "@/lib/notification";
import {
    getApiErrorMessage,
    getApiFieldErrors,
} from "@/lib/api-error";

import { useSupplier } from "../hooks/useSupplierQueries";
import {
    useCreateSupplier,
    useUpdateSupplier,
} from "../hooks/useSupplierMutations";

const supplierSchema = z.object({
    company_name: z.string().trim().min(2).max(255),
    contact_person: z.string().trim().max(100).optional().or(z.literal("")),
    email: z.string().trim().email().optional().or(z.literal("")),
    country_code: z.string().optional().or(z.literal("")),
    mobile: z.string().trim().max(15).optional().or(z.literal("")),
    alternate_mobile: z.string().trim().max(15).optional().or(z.literal("")),
    website: z.string().trim().url().optional().or(z.literal("")),
    gstin: z.string().trim().max(20).optional().or(z.literal("")),
    pan: z.string().trim().max(20).optional().or(z.literal("")),
    payment_terms_days: z.coerce
        .number().int().min(0).optional().or(z.literal("")),
    credit_limit: z.coerce
        .number().min(0).optional().or(z.literal("")),
    notes: z.string().optional().or(z.literal("")),
    is_active: z.boolean(),
});


export default function SupplierFormPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();
    const isEdit = Boolean(uuid);

    const { data: supplier, isLoading } = useSupplier(
        isEdit ? uuid : undefined
    );
    const create = useCreateSupplier();
    const update = useUpdateSupplier();
    const mutation = isEdit ? update : create;

    const { register, control, handleSubmit, reset, formState: { errors } } =
        useForm<SupplierFormValues>({
            resolver: zodResolver(supplierSchema) as never,
            defaultValues: {
                company_name: "",
                contact_person: "",
                email: "",
                country_code: "+91",
                mobile: "",
                alternate_mobile: "",
                website: "",
                gstin: "",
                pan: "",
                payment_terms_days: "",
                credit_limit: "",
                notes: "",
                is_active: true,
            },
        });

    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

    const serverError = (field: string) =>
        serverErrors[field] || errors[field]?.message;

    const loadError = (err: unknown) => {
        const fieldErrors = getApiFieldErrors(err);
        const fe: Record<string, string> = {};
        for (const key of Object.keys(fieldErrors)) {
            const val = fieldErrors[key];
            if (Array.isArray(val)) fe[key] = val[0] ?? "";
            else if (val) fe[key] = val;
        }
        setServerErrors(fe);
        const generic = getApiErrorMessage(err);
        if (generic) notification.error("Unable to save supplier.", generic);
    };

    if (isEdit && isLoading) {
        return <div className="text-sm text-muted-foreground">Loading supplier...</div>;
    }

    const onSubmit = async (data: SupplierFormValues) => {
        setServerErrors({});
        const payload = {
            company_name: data.company_name,
            contact_person: data.contact_person || undefined,
            email: data.email || undefined,
            country_code: data.country_code || undefined,
            mobile: data.mobile || undefined,
            alternate_mobile: data.alternate_mobile || undefined,
            website: data.website || undefined,
            gstin: data.gstin || undefined,
            pan: data.pan || undefined,
            payment_terms_days: data.payment_terms_days === "" ? undefined : Number(data.payment_terms_days),
            credit_limit: data.credit_limit === "" ? undefined : Number(data.credit_limit),
            notes: data.notes || undefined,
            is_active: data.is_active,
        };
        try {
            if (isEdit && uuid) {
                await update.mutateAsync({ uuid, data: payload });
            } else {
                await create.mutateAsync(payload);
            }
            notification.success("Supplier saved successfully.",
                `The supplier has been ${isEdit ? "updated" : "created"}.`);
            navigate(ROUTES.SUPPLIERS);
        } catch (err) { loadError(err); }
    };

    const [hasReset, setHasReset] = useState(false);
    if (isEdit && supplier && !hasReset) {
        reset({
            company_name: supplier.company_name ?? "",
            contact_person: supplier.contact_person ?? "",
            email: supplier.email ?? "",
            country_code: supplier.country_code ?? "+91",
            mobile: supplier.mobile ?? "",
            alternate_mobile: supplier.alternate_mobile ?? "",
            website: supplier.website ?? "",
            gstin: supplier.gstin ?? "",
            pan: supplier.pan ?? "",
            payment_terms_days: supplier.payment_terms_days === null ? "" : supplier.payment_terms_days,
            credit_limit: supplier.credit_limit === null ? "" : supplier.credit_limit,
            notes: supplier.notes ?? "",
            is_active: Boolean(supplier.is_active),
        });
                setHasReset(true);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {isEdit ? "Edit Supplier" : "Create Supplier"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {isEdit ? "Update supplier details" : "Add a new supplier"}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Company Name" required error={serverError("company_name")}>
                        <Input {...register("company_name")} defaultValue="" />
                    </Field>
                    <Field label="Contact Person" error={serverError("contact_person")}>
                        <Input {...register("contact_person")} defaultValue="" />
                    </Field>
                    <Field label="Email" error={serverError("email")}>
                        <Input type="email" {...register("email")} defaultValue="" />
                    </Field>
                    <Field label="Mobile" error={serverError("mobile")}>
                        <div className="flex gap-2">
                            <Input {...register("country_code")} defaultValue="+91" className="w-20" />
                            <Input {...register("mobile")} defaultValue="" />
                        </div>
                    </Field>
                    <Field label="Alternate Mobile" error={serverError("alternate_mobile")}>
                        <Input {...register("alternate_mobile")} defaultValue="" />
                    </Field>
                    <Field label="Website" error={serverError("website")}>
                        <Input {...register("website")} defaultValue="" />
                    </Field>
                    <Field label="GSTIN" error={serverError("gstin")}>
                        <Input {...register("gstin")} defaultValue="" />
                    </Field>
                    <Field label="PAN" error={serverError("pan")}>
                        <Input {...register("pan")} defaultValue="" />
                    </Field>
                    <Field label="Payment Terms (days)" error={serverError("payment_terms_days")}>
                        <Input type="number" {...register("payment_terms_days")} defaultValue="" />
                    </Field>
                    <Field label="Credit Limit" error={serverError("credit_limit")}>
                        <Input type="number" {...register("credit_limit")} defaultValue="" />
                    </Field>
                    <Field label="Status" error={serverError("is_active")}>
                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value ? "1" : "0"}
                                    onValueChange={(value) => field.onChange(value === "1")}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Active</SelectItem>
                                        <SelectItem value="0">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                    <div className="md:col-span-2">
                        <Field label="Notes" error={serverError("notes")}>
                            <Textarea {...register("notes")} defaultValue="" rows={3} />
                        </Field>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <Button type="button" variant="outline"
                        disabled={mutation.isPending}
                        onClick={() => navigate(ROUTES.SUPPLIERS)}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Saving..." :
                         isEdit ? "Update Supplier" : "Create Supplier"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function Field({
    label, required, error, children,
}: { label: string; required?: boolean; error?: string | null; children: React.ReactNode; }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">
                {label}{required && <span className="text-destructive"> *</span>}
            </label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
