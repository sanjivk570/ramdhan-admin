import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { useCustomer } from "../hooks/useCustomerQueries";
import {
    useCreateCustomer,
    useUpdateCustomer,
} from "../hooks/useCustomerMutations";

const customerSchema = z.object({
    first_name: z.string().trim().min(2).max(100),
    last_name: z.string().trim().max(100).optional().or(z.literal("")),
    email: z.string().trim().email(),
    country_code: z.string().min(1),
    mobile: z.string().trim().max(15).optional().or(z.literal("")),
    password: z.string().optional().or(z.literal("")),
    password_confirmation: z
        .string()
        .optional()
        .or(z.literal("")),
    is_active: z.boolean(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

export default function CustomerFormPage() {
    const navigate = useNavigate();
    const { uuid } = useParams<{ uuid: string }>();
    const isEdit = Boolean(uuid);

    const { data: customer, isLoading } = useCustomer(
        isEdit ? uuid : undefined
    );
    const create = useCreateCustomer();
    const update = useUpdateCustomer();
    const mutation = isEdit ? update : create;

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema) as never,
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            country_code: "+91",
            mobile: "",
            password: "",
            password_confirmation: "",
            is_active: true,
        },
    });

    useEffect(() => {
        if (!isEdit || !customer) return;
        reset({
            first_name: customer.first_name ?? "",
            last_name: customer.last_name ?? "",
            email: customer.email ?? "",
            country_code: customer.country_code ?? "+91",
            mobile: customer.mobile ?? "",
            password: "",
            password_confirmation: "",
            is_active: Boolean(customer.is_active),
        });
    }, [customer, isEdit, reset]);

    const onSubmit = async (data: CustomerFormValues) => {
        const payload = {
            first_name: data.first_name,
            last_name: data.last_name || undefined,
            email: data.email,
            country_code: data.country_code || undefined,
            mobile: data.mobile || undefined,
            is_active: data.is_active,
        };

        try {
            if (isEdit && uuid) {
                await update.mutateAsync({ uuid, data: payload });
            } else {
                await create.mutateAsync({
                    ...payload,
                    password: (data.password || "") as string,
                    password_confirmation: (data.password_confirmation ||
                        "") as string,
                });
            }

            notification.success(
                isEdit
                    ? "Customer updated successfully."
                    : "Customer created successfully.",
                "The customer has been saved."
            );
            navigate(ROUTES.CUSTOMERS);
        } catch {
            notification.error(
                isEdit
                    ? "Unable to update customer."
                    : "Unable to create customer.",
                "Please check the form and try again."
            );
        }
    };

    if (isEdit && isLoading) {
        return (
            <div className="text-sm text-muted-foreground">
                Loading customer...
            </div>
        );
    }

    const serverError = (field: string) =>
        getApiFieldErrors(mutation.error)[field];

    const serverMessage = getApiErrorMessage(mutation.error);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {isEdit ? "Edit Customer" : "Create Customer"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {isEdit
                        ? "Update customer information."
                        : "Create a new store customer."}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {serverMessage && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {serverMessage}
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    <div className="border-b bg-muted/20 px-6 py-4">
                        <h2 className="text-base font-semibold">
                            Customer Information
                        </h2>
                    </div>

                    <div className="grid gap-5 p-6 md:grid-cols-2">
                        <Field
                            label="First Name"
                            required
                            error={
                                errors.first_name?.message ||
                                serverError("first_name")
                            }
                        >
                            <Input {...register("first_name")} />
                        </Field>

                        <Field label="Last Name">
                            <Input {...register("last_name")} />
                        </Field>

                        <Field
                            label="Email"
                            required
                            error={
                                errors.email?.message ||
                                serverError("email")
                            }
                        >
                            <Input type="email" {...register("email")} />
                        </Field>

                        <Field label="Country Code">
                            <Input {...register("country_code")} />
                        </Field>

                        <Field label="Mobile" error={serverError("mobile")}>
                            <Input {...register("mobile")} />
                        </Field>

                        <Field label="Status">
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value ? "1" : "0"}
                                        onValueChange={(value) =>
                                            field.onChange(value === "1")
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="0">
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>

                        {!isEdit && <PasswordFields register={register} />}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={mutation.isPending}
                        onClick={() => navigate(ROUTES.CUSTOMERS)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending
                            ? "Saving..."
                            : isEdit
                              ? "Update Customer"
                              : "Create Customer"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function Field({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string | null;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">
                {label}
                {required && <span className="text-destructive"> *</span>}
            </label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
