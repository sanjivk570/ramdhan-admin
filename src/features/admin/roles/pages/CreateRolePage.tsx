import {
    useNavigate,
} from "react-router-dom";

import type {
    AxiosError,
} from "axios";

import RoleForm from "../components/RoleForm";

import {
    useCreateRole,
} from "../hooks/useCreateRole";

import type {
    RoleFormData,
} from "../validation/role.schema";

import type {
    CreateRolePayload,
} from "../types/role";

import {
    ROUTES,
} from "@/app/router/route-paths";

import { notification } from "@/lib/notification";

interface ApiErrorResponse {

    message?: string;

    errors?: Record<
        string,
        string[] | string
    >;

}

export default function CreateRolePage() {

    const navigate =
        useNavigate();

    const createRole =
        useCreateRole();

    const handleSubmit = async (
        data: RoleFormData
    ) => {

        const payload:
            CreateRolePayload = {

            name:
                data.name,

            display_name:
                data.display_name,

            description:
                data.description ||
                undefined,

            guard_name:
                data.guard_name,

            is_system:
                data.is_system,

        };

        try {
            await createRole.mutateAsync(
                payload
            );

            notification.success(
                "Role Created successfully.",
                "The role has been created."
            );

           navigate(ROUTES.ROLES);

        } catch {
            notification.error(
                "Unable to create role.",
                "Please check the form and try again."
            );
        }

    };

    const error =
        createRole.error as
        AxiosError<ApiErrorResponse> | null;

    return (

        <div className="space-y-6">

            <div>

                <h1 className="
                    text-2xl
                    font-semibold
                    tracking-tight
                ">
                    Create Role
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    Create a new role for your application.
                </p>

            </div>

            <RoleForm

                onSubmit={
                    handleSubmit
                }

                loading={
                    createRole.isPending
                }

                serverErrors={
                    error?.response?.data?.errors
                    ?? {}
                }

                serverMessage={
                    error?.response?.data?.message
                }

                onCancel={() =>
                    navigate(
                        ROUTES.ROLES
                    )
                }

            />

        </div>

    );

}