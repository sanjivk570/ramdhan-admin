import { useState } from "react";
import {
    Controller,
    useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Eye,
    EyeOff,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    userSchema,
    type UserFormData,
} from "../validation/user.schema";

interface UserRoleOption {
    label: string;
    value: string;
}

interface UserFormProps {
    loading?: boolean;

    roles?: UserRoleOption[];

    rolesLoading?: boolean;

    serverErrors?: Record<
        string,
        string[] | string
    >;

    serverMessage?: string;

    onSubmit: (
        data: UserFormData
    ) => void | Promise<void>;

    onCancel?: () => void;
}

export default function UserForm({

    loading = false,

    roles = [],

    rolesLoading = false,

    serverErrors = {},

    serverMessage,

    onSubmit,

    onCancel,

}: UserFormProps) {

    const [
        showPassword,
        setShowPassword,
    ] = useState(false);

    const [
        showPasswordConfirmation,
        setShowPasswordConfirmation,
    ] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<UserFormData>({

        resolver:
            zodResolver(userSchema),

        defaultValues: {

            first_name: "",

            last_name: "",

            email: "",

            mobile: "",

            country_code: "+91",

            password: "",

            password_confirmation: "",

            role: "",

            is_active: 1,

        },

    });

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
            onSubmit={handleSubmit(onSubmit)}
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

            {/* Basic Information */}

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
                        Basic Information
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Enter the user's basic account information.
                    </p>

                </div>

                <div className="
                    grid
                    gap-5
                    p-6
                    md:grid-cols-2
                ">

                    {/* First Name */}

                    <div className="space-y-2">

                        <label
                            htmlFor="first_name"
                            className="text-sm font-medium"
                        >
                            First Name
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <Input
                            id="first_name"
                            placeholder="Enter first name"
                            {...register("first_name")}
                        />

                        {errors.first_name && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .first_name
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "first_name"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "first_name"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Last Name */}

                    <div className="space-y-2">

                        <label
                            htmlFor="last_name"
                            className="text-sm font-medium"
                        >
                            Last Name
                        </label>

                        <Input
                            id="last_name"
                            placeholder="Enter last name"
                            {...register("last_name")}
                        />

                        {errors.last_name && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .last_name
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "last_name"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "last_name"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Email */}

                    <div className="space-y-2">

                        <label
                            htmlFor="email"
                            className="text-sm font-medium"
                        >
                            Email
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            {...register("email")}
                        />

                        {errors.email && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .email
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "email"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "email"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Mobile */}

                    <div className="space-y-2">

                        <label
                            htmlFor="mobile"
                            className="text-sm font-medium"
                        >
                            Mobile
                        </label>

                        <div className="flex gap-2">

                            <Controller
                                name="country_code"
                                control={control}
                                render={({
                                    field,
                                }) => (

                                    <Select
                                        value={
                                            field.value ||
                                            "+91"
                                        }
                                        onValueChange={
                                            field.onChange
                                        }
                                    >

                                        <SelectTrigger className="w-28">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="+91">
                                                +91
                                            </SelectItem>

                                            <SelectItem value="+1">
                                                +1
                                            </SelectItem>

                                            <SelectItem value="+44">
                                                +44
                                            </SelectItem>

                                        </SelectContent>

                                    </Select>

                                )}
                            />

                            <Input
                                id="mobile"
                                placeholder="Enter mobile number"
                                {...register("mobile")}
                            />

                        </div>

                        {errors.mobile && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .mobile
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "mobile"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "mobile"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Role */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Role
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <Controller
                            name="role"
                            control={control}
                            render={({
                                field,
                            }) => (

                                <Select
                                    value={
                                        field.value ||
                                        undefined
                                    }
                                    onValueChange={
                                        field.onChange
                                    }
                                >

                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>

                                    {/* <SelectContent>

                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>

                                        <SelectItem value="user">
                                            User
                                        </SelectItem>

                                    </SelectContent> */}

                                    <SelectContent>

                                        {rolesLoading ? (

                                            <SelectItem
                                                value="__loading"
                                                disabled
                                            >
                                                Loading roles...
                                            </SelectItem>

                                        ) : roles.length === 0 ? (

                                            <SelectItem
                                                value="__empty"
                                                disabled
                                            >
                                                No roles available
                                            </SelectItem>

                                        ) : (

                                            roles.map((role) => (

                                                <SelectItem
                                                    key={role.value}
                                                    value={role.value}
                                                >
                                                    {role.label}
                                                </SelectItem>

                                            ))

                                        )}

                                    </SelectContent>

                                </Select>

                            )}
                        />

                        {errors.role && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .role
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "role"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "role"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Status */}

                    <div className="space-y-2">

                        <label className="text-sm font-medium">
                            Status
                        </label>

                        <Controller
                            name="is_active"
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

                        {getServerError(
                            "is_active"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "is_active"
                                )}
                            </p>

                        )}

                    </div>

                </div>

            </div>

            {/* Security */}

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
                        Security
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-muted-foreground
                    ">
                        Set the user's login password.
                    </p>

                </div>

                <div className="
                    grid
                    gap-5
                    p-6
                    md:grid-cols-2
                ">

                    {/* Password */}

                    <div className="space-y-2">

                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <div className="relative">

                            <Input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                className="pr-10"
                                {...register(
                                    "password"
                                )}
                            />

                            <button
                                type="button"
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-muted-foreground
                                    hover:text-foreground
                                "
                                onClick={() =>
                                    setShowPassword(
                                        (value) =>
                                            !value
                                    )
                                }
                            >

                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}

                            </button>

                        </div>

                        {errors.password && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .password
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "password"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "password"
                                )}
                            </p>

                        )}

                    </div>

                    {/* Confirm Password */}

                    <div className="space-y-2">

                        <label
                            htmlFor="password_confirmation"
                            className="text-sm font-medium"
                        >
                            Confirm Password
                            <span className="ml-1 text-destructive">
                                *
                            </span>
                        </label>

                        <div className="relative">

                            <Input
                                id="password_confirmation"
                                type={
                                    showPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm password"
                                className="pr-10"
                                {...register(
                                    "password_confirmation"
                                )}
                            />

                            <button
                                type="button"
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-muted-foreground
                                    hover:text-foreground
                                "
                                onClick={() =>
                                    setShowPasswordConfirmation(
                                        (value) =>
                                            !value
                                    )
                                }
                            >

                                {showPasswordConfirmation ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}

                            </button>

                        </div>

                        {errors.password_confirmation && (

                            <p className="text-sm text-destructive">
                                {
                                    errors
                                        .password_confirmation
                                        .message
                                }
                            </p>

                        )}

                        {getServerError(
                            "password_confirmation"
                        ) && (

                            <p className="text-sm text-destructive">
                                {getServerError(
                                    "password_confirmation"
                                )}
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
                        : "Create User"}

                </Button>

            </div>

        </form>

    );
}