import {
    useNavigate,
    useParams,
} from "react-router-dom";

import type {
    AxiosError,
} from "axios";

import RoleForm from "../components/RoleForm";

import RolePermissions
    from "../components/RolePermissions";

import {
    useRole,
} from "../hooks/useRole";

import {
    useUpdateRole,
} from "../hooks/useUpdateRole";

import type {
    RoleFormData,
} from "../validation/role.schema";

import type {
    UpdateRolePayload,
} from "../types/role";

import {
    ROUTES,
} from "../../../app/router/route-paths";

import { notification } from "@/lib/notification";

interface ApiErrorResponse {

    message?: string;

    errors?: Record<
        string,
        string[] | string
    >;

}

export default function EditRolePage() {

    const {
        id,
    } = useParams();

    const navigate =
        useNavigate();

    const roleId =
        Number(id);

    const {
        data: role,
        isLoading,
    } = useRole(roleId);

    const updateRole =
        useUpdateRole(roleId);

    const handleSubmit = async (
        data: RoleFormData
    ) => {

        const payload:
            UpdateRolePayload = {

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
            await updateRole.mutateAsync(payload);

            notification.success(
                "Role updated successfully.",
                "The role has been updated."
            );

            navigate(
                `${ROUTES.ROLES}/${roleId}`
            );
        } catch {
            notification.error(
                "Unable to update role.",
                "Please check the form and try again."
            );
        }
    };

    const error =
        updateRole.error as
        AxiosError<ApiErrorResponse> | null;

    if (isLoading) {

        return (
            <div className="
                py-12
                text-center
                text-sm
                text-muted-foreground
            ">
                Loading role...
            </div>
        );

    }

    if (!role) {

        return (
            <div className="
                rounded-xl
                border
                bg-card
                p-8
                text-center
            ">
                Role not found.
            </div>
        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="
                    text-2xl
                    font-semibold
                    tracking-tight
                ">
                    Edit Role
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    Update role information and manage permissions.
                </p>

            </div>

            {/* Role Form */}

            <RoleForm

                initialValues={{

                    name:
                        role.name,

                    display_name:
                        role.display_name,

                    description:
                        role.description ||
                        "",

                    guard_name:
                        role.guard_name,

                    is_system:
                        Boolean(
                            role.is_system
                        ),

                }}

                onSubmit={
                    handleSubmit
                }

                loading={
                    updateRole.isPending
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
                        `${ROUTES.ROLES}/${roleId}`
                    )
                }

                mode = "edit"

            />

            {/* Permissions */}

            <RolePermissions
                roleId={
                    roleId
                }
            />

        </div>

    );

}