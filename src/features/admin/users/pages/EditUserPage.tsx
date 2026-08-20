import {
    useNavigate,
    useParams,
} from "react-router-dom";

import type { AxiosError } from "axios";

import UserForm from "../components/UserForm";

import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

import type {
    UserFormData,
} from "../validation/user.schema";

import type {
    UpdateUserPayload,
} from "../types/user";

import { ROUTES } from "@/app/router/route-paths";

import { useRoles } from "@/features/admin/roles/hooks/useRoles";

import { notification } from "@/lib/notification";

interface ApiErrorResponse {
    message?: string;

    errors?: Record<
        string,
        string[] | string
    >;
}

export default function EditUserPage() {

    const navigate = useNavigate();

    const { uuid } = useParams<{
        uuid: string;
    }>();

    const {
        data: user,
        isLoading: userLoading,
        isError: userError,
    } = useUser(uuid);

    const updateUser =
        useUpdateUser();

    const {
        data: rolesResponse,
        isLoading: rolesLoading,
    } = useRoles({
        page: 1,
        per_page: 100,
    });
    // const roles = rolesResponse?.data ?? [];

    const roles =
        rolesResponse?.data?.map((role) => ({
            label:
                role.display_name || role.name,

            value:
                role.name,
        })) ?? [];

    const handleSubmit = async (
        data: UserFormData
    ) => {

        if (!uuid) {
            return;
        }

        const payload: UpdateUserPayload = {
            first_name: data.first_name,

            last_name:
                data.last_name || undefined,

            email: data.email,

            mobile:
                data.mobile || undefined,

            country_code:
                data.country_code || undefined,

            role: data.role,

            is_active: data.is_active,
        };

        /*
         * Password only send when user
         * actually entered a new password.
         */
        if (data.password) {

            payload.password =
                data.password;

            payload.password_confirmation =
                data.password_confirmation;
        }

        // await updateUser.mutateAsync({
        //     uuid,
        //     data: payload,
        // });

        //navigate(ROUTES.USERS);

        try {
            await updateUser.mutateAsync({
                uuid,
                data: payload,
            });
            navigate(ROUTES.USERS);

            notification.success(
                "User Update successfully.",
                "The user account has been updated."
            );
            
        } catch {
            notification.error(
                "Unable to update user.",
                "Please check the form and try again."
            );
        }
    };

    const error =
        updateUser.error as
        AxiosError<ApiErrorResponse> | null;

    if (!uuid) {

        return (
            <div className="space-y-4">

                <h1 className="text-2xl font-semibold">
                    Invalid User
                </h1>

                <p className="text-sm text-muted-foreground">
                    User UUID is missing.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            ROUTES.USERS
                        )
                    }
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    Back to Users
                </button>

            </div>
        );
    }

    if (userLoading) {

        return (
            <div className="space-y-6">

                <div>
                    <h1 className="text-2xl font-semibold">
                        Edit User
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Loading user information...
                    </p>
                </div>

                <div className="
                    rounded-xl
                    border
                    bg-card
                    p-6
                    text-sm
                    text-muted-foreground
                ">
                    Loading user...
                </div>

            </div>
        );
    }

    if (userError || !user) {

        return (
            <div className="space-y-4">

                <h1 className="text-2xl font-semibold">
                    User Not Found
                </h1>

                <p className="text-sm text-muted-foreground">
                    Unable to load the requested user.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            ROUTES.USERS
                        )
                    }
                    className="rounded-md border px-4 py-2 text-sm"
                >
                    Back to Users
                </button>

            </div>
        );
    }

    return (
        

        <div className="space-y-6">

            {/* Page Header */}

            <div>

                <h1 className="text-2xl font-semibold tracking-tight">
                    Edit User
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Update user account information.
                </p>

            </div>

            {/* Form */}

            <UserForm
                initialData={{
                    first_name:
                        user.first_name,

                    last_name:
                        user.last_name ?? "",

                    email:
                        user.email,

                    mobile:
                        user.mobile ?? "",

                    country_code:
                        user.country_code ?? "+91",

                    role: user.role?.name ?? "",

                    is_active: Boolean(user.is_active),

                    password: "",

                    password_confirmation: "",
                }}

                onSubmit={
                    handleSubmit
                }

                loading={
                    updateUser.isPending
                }

                roles={roles}

                rolesLoading={rolesLoading}

                serverErrors={
                    error?.response?.data?.errors
                    ?? {}
                }

                serverMessage={
                    error?.response?.data?.message
                }

                onCancel={() =>
                    navigate(
                        ROUTES.USERS
                    )
                }

                mode = "edit"
            />

        </div>

    );
}