import {
    Link, useParams, useNavigate
} from "react-router-dom";

import {
    ArrowLeft,
    Pencil,
    Shield,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

import {
    useRole,
} from "../hooks/useRole";

import {
    useRolePermissions,
} from "../hooks/useRolePermissions";

import {
    ROUTES,
} from "../../../app/router/route-paths";

interface RolePermissionsResponse {
    success?: boolean;
    message?: string;
    data?: string[];
    errors?: unknown;
    meta?: unknown;
}

export default function RoleDetailsPage() {

    const navigate = useNavigate();

    const {
        id,
    } = useParams();

    const roleId =
        Number(id);

    const {
        data: role,
        isLoading: roleLoading,
    } = useRole(roleId);

    const {
        data: permissionsResponse,
        isLoading:
            permissionsLoading,
    } = useRolePermissions(roleId);

    /*
     * API response can be:
     *
     * {
     *     success: true,
     *     data: [
     *         "user.update",
     *         "user.create"
     *     ]
     * }
     *
     * OR hook may already return:
     *
     * [
     *     "user.update",
     *     "user.create"
     * ]
     *
     * Normalize both cases to string[].
     */
    const permissions: string[] =
        Array.isArray(
            permissionsResponse
        )
            ? permissionsResponse
            : (
                permissionsResponse &&
                typeof permissionsResponse === "object" &&
                "data" in permissionsResponse &&
                Array.isArray(
                    (
                        permissionsResponse as RolePermissionsResponse
                    ).data
                )
            )
                ? (
                    permissionsResponse as RolePermissionsResponse
                ).data ?? []
                : [];

    if (roleLoading) {

        return (
            <div className="
                flex
                min-h-[300px]
                items-center
                justify-center
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

                <h2 className="text-lg font-semibold">
                    Role not found
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    The requested role could not be found.
                </p>

                <Button
                    className="mt-4"
                >

                    <Link
                        to={ROUTES.ROLES}
                    >
                        Back to Roles
                    </Link>

                </Button>

            </div>
        );

    }

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <Button
                        variant="outline"
                        size="icon"
                    >

                        <Link
                            to={ROUTES.ROLES}
                        >

                            <ArrowLeft
                                className="h-4 w-4"
                            />

                        </Link>

                    </Button>

                    <div>

                        <h1 className="
                            text-2xl
                            font-semibold
                            tracking-tight
                        ">
                            {role.display_name}
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        ">
                            View role information and permissions.
                        </p>

                    </div>

                </div>

                {/* <Button>

                    <Link
                        to={`${ROUTES.ROLES}/${role.id}/edit`}
                    >

                        <Edit className="mr-2 h-4 w-4" />

                        Edit Role

                    </Link>

                </Button> */}

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate(
                                ROUTES.USERS
                            )
                        }
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(
                                `${ROUTES.ROLES}/${role.id}/edit`
                            )
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>

            </div>

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

                    <h2 className="font-semibold">
                        Role Information
                    </h2>

                </div>

                <div className="
                    grid
                    gap-6
                    p-6
                    md:grid-cols-2
                ">

                    {/* Role Name */}

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        ">
                            Role Name
                        </p>

                        <p className="mt-1 font-medium">
                            {role.name}
                        </p>

                    </div>

                    {/* Display Name */}

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        ">
                            Display Name
                        </p>

                        <p className="mt-1 font-medium">
                            {role.display_name}
                        </p>

                    </div>

                    {/* Guard */}

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        ">
                            Guard
                        </p>

                        <Badge
                            variant="outline"
                            className="mt-2"
                        >
                            {role.guard_name}
                        </Badge>

                    </div>

                    {/* System Role */}

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        ">
                            System Role
                        </p>

                        <Badge
                            variant={
                                role.is_system
                                    ? "default"
                                    : "secondary"
                            }
                            className="mt-2"
                        >
                            {role.is_system
                                ? "System"
                                : "Custom"}
                        </Badge>

                    </div>

                    {/* Description */}

                    <div className="md:col-span-2">

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-muted-foreground
                        ">
                            Description
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            text-muted-foreground
                        ">
                            {role.description ||
                                "No description provided."}
                        </p>

                    </div>

                </div>

            </div>

            {/* Permissions */}

            <div className="
                overflow-hidden
                rounded-xl
                border
                bg-card
                shadow-sm
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    bg-muted/20
                    px-6
                    py-4
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-primary/10
                        ">

                            <Shield className="
                                h-4
                                w-4
                                text-primary
                            " />

                        </div>

                        <div>

                            <h2 className="font-semibold">
                                Permissions
                            </h2>

                            <p className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            ">
                                Permissions assigned to this role.
                            </p>

                        </div>

                    </div>

                    <Badge variant="outline">
                        {permissions.length} Permissions
                    </Badge>

                </div>

                <div className="p-6">

                    {permissionsLoading ? (

                        <div className="
                            py-8
                            text-center
                            text-sm
                            text-muted-foreground
                        ">
                            Loading permissions...
                        </div>

                    ) : permissions.length === 0 ? (

                        <div className="
                            rounded-lg
                            border
                            border-dashed
                            p-8
                            text-center
                        ">

                            <p className="
                                text-sm
                                font-medium
                            ">
                                No permissions assigned
                            </p>

                            <p className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            ">
                                This role currently has no permissions.
                            </p>

                        </div>

                    ) : (

                        <div className="
                            grid
                            gap-3
                            sm:grid-cols-2
                            lg:grid-cols-3
                        ">

                            {permissions.map(
                                (
                                    permission
                                ) => (

                                    <div
                                        key={permission}
                                        className="
                                            rounded-lg
                                            border
                                            bg-muted/20
                                            px-4
                                            py-3
                                        "
                                    >

                                        <p className="
                                            text-sm
                                            font-medium
                                        ">
                                            {permission}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}