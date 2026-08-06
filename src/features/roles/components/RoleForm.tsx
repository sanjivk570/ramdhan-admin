import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    Button,
} from "@/components/ui/button";

import {
    Controller,
} from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    roleSchema,
    type RoleFormData,
} from "../validation/role.schema";

import {
    useEffect,
} from "react";

interface RoleFormProps {

    initialValues?: RoleFormData;

    loading?: boolean;

    serverErrors?: Record<
        string,
        string[] | string
    >;

    serverMessage?: string;

    onSubmit: (
        data: RoleFormData
    ) => void | Promise<void>;

    onCancel?: () => void;

}

export default function RoleForm({

    initialValues,

    loading = false,

    serverErrors = {},

    serverMessage,

    onSubmit,

    onCancel,

}: RoleFormProps) {

    // const {
    //     register,
    //     control,
    //     handleSubmit,
    //     formState: {
    //         errors,
    //     },
    // } = useForm<RoleFormData>({

    //     resolver:
    //         zodResolver(roleSchema),

    //     defaultValues:
    //     initialValues ?? {

    //         name: "",

    //         display_name: "",

    //         description: "",

    //         guard_name: "web",

    //         is_system: false,

    //     },

    // });

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<RoleFormData>({

        resolver:
            zodResolver(roleSchema),

        defaultValues: {

            name: "",

            display_name: "",

            description: "",

            guard_name: "web",

            is_system: false,

        },

    });

    useEffect(() => {
        if (initialValues) {
            reset(
                initialValues
            );
        }
    }, [
        initialValues,
        reset,
    ]);
    

    const getServerError = (
        field: string
    ) => {

        const error =
            serverErrors[field];

        if (!error) {
            return null;
        }

        return Array.isArray(error)
            ? error[0]
            : error;

    };

    return (

        <form
            onSubmit={
                handleSubmit(onSubmit)
            }
            className="space-y-6"
        >

            {/* API Error */}

            {serverMessage && (

                <div className="
                    rounded-lg
                    border
                    border-destructive/30
                    bg-destructive/10
                    px-4
                    py-3
                    text-sm
                    text-destructive
                ">
                    {serverMessage}
                </div>

            )}

            {/* Role Information */}

            <div className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            ">

                <div className="
                    border-b
                    bg-muted/20
                    px-6
                    py-4
                ">

                    <h2 className="text-base font-semibold">
                        Role Information
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Configure the role details.
                    </p>

                </div>

                <div className="
                    grid
                    gap-5
                    p-6
                    md:grid-cols-2
                ">

                    {/* Name */}

                    <div className="space-y-2">

                        <label
                            htmlFor="name"
                            className="text-sm font-medium"
                        >
                            Name
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <Input
                            id="name"
                            placeholder="Enter Name"
                            {...register("name")}
                        />

                        {errors.name && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .name
                                        .message
                                }
                            </p>

                        )}

                        {getServerError("name") && (

                            <p className="text-sm text-destructive">
                                {
                                    getServerError(
                                        "name"
                                    )
                                }
                            </p>

                        )}

                    </div>

                    {/* Display Name */}

                    <div className="space-y-2">

                        <label
                            htmlFor="display_name"
                            className="text-sm font-medium"
                        >
                            Display Name
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <Input
                            id="display_name"
                            placeholder="Enter Manager"
                            {...register(
                                "display_name"
                            )}
                        />

                        {errors.display_name && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .display_name
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "display_name"
                        ) && (

                            <p className="text-sm text-destructive">
                                {
                                    getServerError(
                                        "display_name"
                                    )
                                }
                            </p>

                        )}

                    </div>

                    {/* Guard */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Guard Name
                        </label>

                        <Controller
                            name="guard_name"
                            control={control}
                            render={({
                                field,
                            }) => (

                                <Select
                                    value={
                                        field.value
                                    }
                                    onValueChange={
                                        field.onChange
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="web">
                                            web
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            )}
                        />

                    </div>

                    {/* System Role */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            System Role
                        </label>

                        <Controller
                            name="is_system"
                            control={control}
                            render={({
                                field,
                            }) => (

                                <Select
                                    value={
                                        field.value
                                            ? "1"
                                            : "0"
                                    }
                                    onValueChange={(
                                        value
                                    ) =>
                                        field.onChange(
                                            value === "1"
                                        )
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>

                                        <SelectItem value="0">
                                            No
                                        </SelectItem>

                                        <SelectItem value="1">
                                            Yes
                                        </SelectItem>

                                    </SelectContent>

                                </Select>

                            )}
                        />

                    </div>

                    {/* Description */}

                    <div className="
                        space-y-2
                        md:col-span-2
                    ">

                        <label
                            htmlFor="description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>

                        <Textarea
                            id="description"
                            placeholder="Describe this role..."
                            rows={4}
                            {...register(
                                "description"
                            )}
                        />

                        {errors.description && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .description
                                        .message
                                }
                            </p>

                        )}

                    </div>

                </div>

            </div>

            {/* Actions */}

            <div className="
                flex
                items-center
                justify-end
                gap-3
            ">

                {onCancel && (

                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                )}

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Creating..."
                        : "Create Role"}

                </Button>

            </div>

        </form>

    );

}